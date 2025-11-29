import reportRepository from '../repositories/report.repository.js';
import { redis } from '../config/redisConnection.js';

const create = async ({ stationId, userId, comment }) => {
  // Create report
  const report = await reportRepository.create({
    user: userId,
    station: stationId,
    comment,
  });

  // Invalidate station cache
  await redis.del(`station:${stationId}`);

  return report;
};

export default { create };
