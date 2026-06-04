import stationRepository from '../repositories/station.repository.js';
import userRepository from '../repositories/user.repository.js';
import evRepository from '../repositories/car.repository.js';
import { redis } from '../config/redisConnection.js';
import ApiError from '../config/ApiError.js';
import { broadcast } from '../config/websocket.js';
import { IStation } from '../models/Station.js';
import { ERROR_CODES } from '../utils/errorCodes.js';
import Station from '../models/Station.js';
import Review from '../models/Review.js';

const getStationsVersion = async (): Promise<number> => {
  try {
    let version = await redis.get<number>('stations:version');
    if (version === null || version === undefined) {
      version = 1;
      await redis.set('stations:version', version);
    }
    return Number(version);
  } catch (error) {
    // Graceful fallback to version 1 if Redis fails
    return 1;
  }
};

const getAllStations = async (filters: any = {}): Promise<IStation[]> => {
  const version = await getStationsVersion();
  const filterKey = JSON.stringify(filters);
  const cacheKey = `stations:v${version}:${filterKey}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) return cached as IStation[];
  } catch (error) {
    // Ignore cache error, fallback to DB
  }

  const stations = await stationRepository.findAll(filters);

  try {
    // Cache for 1 hour
    await redis.set(cacheKey, stations, { ex: 3600 });
  } catch (error) {
    // Ignore cache error
  }
  return stations;
};

const getMyStations = async (userId: string): Promise<IStation[]> => {
  const cacheKey = `myStations:${userId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return cached as IStation[];
  } catch (error) {
    // Ignore cache error
  }

  const stations = await stationRepository.findByUser(userId);
  try {
    await redis.set(cacheKey, stations, { ex: 3600 });
  } catch (error) {
    // Ignore cache error
  }
  return stations;
};

const getStationById = async (id: string): Promise<IStation> => {
  const cacheKey = `station:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return cached as IStation;
  } catch (error) {
    // Ignore cache error
  }

  const station = await stationRepository.findById(id);
  if (!station) throw new ApiError('Station not found', 404, ERROR_CODES.NOT_FOUND);

  try {
    await redis.set(cacheKey, station, { ex: 3600 });
  } catch (error) {
    // Ignore cache error
  }
  return station;
};

const create = async ({ body, userId }: { body: any, userId: string }): Promise<IStation> => {
  const station = await stationRepository.create({
    ...body,
    createdBy: userId,
  });

  try {
    await redis.incr('stations:version');
    await redis.del(`myStations:${userId}`);
  } catch (error) {
    // Ignore cache error
  }

  return station;
};

const update = async ({ stationId, body, userId }: { stationId: string, body: any, userId: string }): Promise<IStation> => {
  const station = await stationRepository.update(stationId, userId, body);
  if (!station) throw new ApiError('Station not found', 404, ERROR_CODES.NOT_FOUND);

  try {
    await redis.incr('stations:version');
    await redis.del(`myStations:${userId}`);
    await redis.del(`station:${stationId}`);
  } catch (error) {
    // Ignore cache error
  }

  // Broadcast the update in real-time
  broadcast('station-updated', station);

  return station;
};

const remove = async (stationId: string, userId: string): Promise<boolean> => {
  const deleted = await stationRepository.delete(stationId, userId);
  if (!deleted) throw new ApiError('Station not found', 404, ERROR_CODES.NOT_FOUND);

  try {
    await redis.incr('stations:version');
    await redis.del(`myStations:${userId}`);
    await redis.del(`station:${stationId}`);
  } catch (error) {
    // Ignore cache error
  }

  // Broadcast deletion in real-time
  broadcast('station-deleted', { _id: stationId });

  return true;
};

const toggleSave = async ({ userId, stationId }: { userId: string, stationId: string }) => {
  const user = await userRepository.findById(userId);
  const station = await stationRepository.findById(stationId);

  if (!station) throw new ApiError('Station not found', 404, ERROR_CODES.NOT_FOUND);
  if (!user) throw new ApiError('User not found', 404, ERROR_CODES.NOT_FOUND);

  // Convert ObjectIds to strings for comparison
  const savedStationIds = user.savedStations.map((s) => s.toString());

  if (savedStationIds.includes(stationId.toString())) {
    // Unsave the station
    user.savedStations = user.savedStations.filter(
      (s) => s.toString() !== stationId.toString(),
    );
    await user.save();
    await redis.del(`savedStations:${userId}`);
    return { action: 'unsaved', savedStations: user.savedStations };
  } else {
    // Save the station
    user.savedStations.push(stationId as any);
    await user.save();
    await redis.del(`savedStations:${userId}`);
    return { action: 'saved', savedStations: user.savedStations };
  }
};

const getSaved = async (userId: string) => {
  const cacheKey = `savedStations:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const user = await userRepository.getSaved(userId);
  if (!user) throw new ApiError('User not found', 404, ERROR_CODES.NOT_FOUND);

  await redis.set(cacheKey, user.savedStations, { ex: 3600 });
  return user.savedStations;
};

const suggestions = async (query: string) => {
  if (!query) return [];
  return stationRepository.search(query);
};

interface EstimateChargingParams {
  stationPower: number;
  pricePerKWh: number;
  evId: string;
  chargeFrom: number;
  chargeTo: number;
}

const estimateCharging = async (data: EstimateChargingParams) => {
  const { stationPower, pricePerKWh, evId, chargeFrom, chargeTo } = data;
  const ev = await evRepository.findById(evId);

  if (!ev) throw new ApiError('EV not found', 404, ERROR_CODES.NOT_FOUND);

  const batterySize = ev.batterySize;
  const energyNeeded = ((chargeTo - chargeFrom) / 100) * batterySize;
  const cost = energyNeeded * pricePerKWh;
  const time = energyNeeded / stationPower;

  return {
    ev: ev.name,
    energyNeeded: energyNeeded.toFixed(2),
    cost: cost.toFixed(2),
    time: (time * 60).toFixed(0),
  };
};

const toggleCharge = async (stationId: string): Promise<IStation> => {
  const station = await stationRepository.findById(stationId);
  if (!station) throw new ApiError('Station not found', 404, ERROR_CODES.NOT_FOUND);

  // Toggle status between 'Active' and 'Inactive' to simulate charging
  station.status = station.status === 'Active' ? 'Inactive' : 'Active';
  await station.save();

  try {
    await redis.incr('stations:version');
    await redis.del(`station:${stationId}`);
  } catch (err) {}

  // Broadcast real-time status change to all connected WebSockets
  broadcast('station-updated', station);

  return station;
};

const getLandingStats = async (): Promise<any> => {
  const cacheKey = 'landing:stats';
  try {
    const cached = await redis.get(cacheKey);
    if (cached) return cached;
  } catch (error) {}

  const chargingPoints = await Station.countDocuments();
  const activeStations = await Station.countDocuments({ status: 'Active' });
  
  const locations = await Station.find({}, { location: 1 }).lean();
  const cities = new Set();
  locations.forEach(loc => {
    if (!loc.location) return;
    const parts = loc.location.split(',');
    if (parts.length >= 3) {
      cities.add(parts[parts.length - 3].trim().toLowerCase());
    } else if (parts.length === 2) {
      cities.add(parts[0].trim().toLowerCase());
    } else {
      cities.add(loc.location.trim().toLowerCase());
    }
  });
  const citiesCovered = cities.size || 1;

  const userReviews = await Review.countDocuments();

  const stats = {
    chargingPoints,
    activeStations,
    citiesCovered,
    userReviews,
  };

  try {
    await redis.set(cacheKey, stats, { ex: 600 }); // cache for 10 minutes
  } catch (error) {}

  return stats;
};

export default {
  getAllStations,
  getMyStations,
  getStationById,
  create,
  update,
  remove,
  toggleSave,
  getSaved,
  suggestions,
  estimateCharging,
  toggleCharge,
  getLandingStats,
};
