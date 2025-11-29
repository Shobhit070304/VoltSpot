import stationRepository from '../repositories/station.repository.js';
import userRepository from '../repositories/user.repository.js';
import evRepository from '../repositories/car.repository.js';
import { redis } from '../config/redisConnection.js';
import ApiError from '../config/ApiError.js';

const getAllStations = async () => {
  const cached = await redis.get('stations');
  if (cached) return cached;

  const stations = await stationRepository.findAll();
  await redis.set('stations', stations, { ex: 3600 });
  return stations;
};

const getMyStations = async (userId) => {
  const cacheKey = `myStations:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const stations = await stationRepository.findByUser(userId);
  await redis.set(cacheKey, stations, { ex: 3600 });
  return stations;
};

const getStationById = async (id) => {
  const cacheKey = `station:${id}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const station = await stationRepository.findById(id);
  if (!station) throw new ApiError(404, 'Station not found');

  await redis.set(cacheKey, station, { ex: 3600 });
  return station;
};

const create = async ({ body, userId }) => {
  const station = await stationRepository.create({
    ...body,
    createdBy: userId,
  });

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);

  return station;
};

const update = async ({ stationId, body, userId }) => {
  const station = await stationRepository.update(stationId, userId, body);
  if (!station) throw new ApiError(404, 'Station not found');

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);
  await redis.del(`station:${stationId}`);

  return station;
};

const remove = async (stationId, userId) => {
  const deleted = await stationRepository.delete(stationId, userId);
  if (!deleted) throw new ApiError(404, 'Station not found');

  await redis.del('stations');
  await redis.del(`myStations:${userId}`);
  await redis.del(`station:${stationId}`);

  return true;
};

const toggleSave = async ({ userId, stationId }) => {
  const user = await userRepository.findById(userId);
  const station = await stationRepository.findById(stationId);

  if (!station) throw new ApiError(404, 'Station not found');

  let message = '';

  if (user.savedStations.includes(stationId)) {
    user.savedStations = user.savedStations.filter(
      (s) => s.toString() !== stationId.toString(),
    );
    message = 'Station removed from saved stations';
  } else {
    user.savedStations.push(stationId);
    message = 'Station saved successfully';
  }

  await user.save();
  await redis.del(`savedStations:${userId}`);

  return { message, savedStations: user.savedStations };
};

const getSaved = async (userId) => {
  const cacheKey = `savedStations:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const user = await userRepository.getSaved(userId);
  if (!user) throw new ApiError(404, 'User not found');

  await redis.set(cacheKey, user.savedStations, { ex: 3600 });
  return user.savedStations;
};

const suggestions = async (query) => {
  if (!query) return [];
  return stationRepository.search(query);
};

const estimateCharging = async (data) => {
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
