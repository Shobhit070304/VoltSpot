import stationRepository from '../repositories/station.repository.js';
import userRepository from '../repositories/user.repository.js';
import evRepository from '../repositories/car.repository.js';
import { redis } from '../config/redisConnection.js';
import ApiError from '../config/ApiError.js';
import { IStation } from '../models/Station.js';

const getAllStations = async (filters: any = {}): Promise<IStation[]> => {
  // Create a unique cache key based on filters
  const filterKey = JSON.stringify(filters);
  const cacheKey = `stations:${filterKey}`;

  const cached = await redis.get(cacheKey);
  if (cached) return cached as IStation[];

  const stations = await stationRepository.findAll(filters);

  // Cache for 1 hour
  await redis.set(cacheKey, stations, { ex: 3600 });
  return stations;
};

const getMyStations = async (userId: string): Promise<IStation[]> => {
  const cacheKey = `myStations:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached as IStation[];

  const stations = await stationRepository.findByUser(userId);
  await redis.set(cacheKey, stations, { ex: 3600 });
  return stations;
};

const getStationById = async (id: string): Promise<IStation> => {
  const cacheKey = `station:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached as IStation;

  const station = await stationRepository.findById(id);
  if (!station) throw new ApiError(404, 'Station not found');

  await redis.set(cacheKey, station, { ex: 3600 });
  return station;
};

const create = async ({ body, userId }: { body: any, userId: string }): Promise<IStation> => {
  const station = await stationRepository.create({
    ...body,
    createdBy: userId,
  });

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);

  return station;
};

const update = async ({ stationId, body, userId }: { stationId: string, body: any, userId: string }): Promise<IStation> => {
  const station = await stationRepository.update(stationId, userId, body);
  if (!station) throw new ApiError(404, 'Station not found');

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);
  await redis.del(`station:${stationId}`);

  return station;
};

const remove = async (stationId: string, userId: string): Promise<boolean> => {
  const deleted = await stationRepository.delete(stationId, userId);
  if (!deleted) throw new ApiError(404, 'Station not found');

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);
  await redis.del(`station:${stationId}`);

  return true;
};

const toggleSave = async ({ userId, stationId }: { userId: string, stationId: string }) => {
  const user = await userRepository.findById(userId);
  const station = await stationRepository.findById(stationId);

  if (!station) throw new ApiError(404, 'Station not found');
  if (!user) throw new ApiError(404, 'User not found');

  let message = '';

  // Convert ObjectIds to strings for comparison
  const savedStationIds = user.savedStations.map((s) => s.toString());

  if (savedStationIds.includes(stationId.toString())) {
    user.savedStations = user.savedStations.filter(
      (s) => s.toString() !== stationId.toString(),
    );
    message = 'Station removed from saved stations';
  } else {
    user.savedStations.push(stationId as any);
    message = 'Station saved successfully';
  }

  await user.save();
  await redis.del(`savedStations:${userId}`);

  return { message, savedStations: user.savedStations };
};

const getSaved = async (userId: string) => {
  const cacheKey = `savedStations:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const user = await userRepository.getSaved(userId);
  if (!user) throw new ApiError(404, 'User not found');

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

  if (!ev) throw new ApiError(404, 'EV not found');

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
};
