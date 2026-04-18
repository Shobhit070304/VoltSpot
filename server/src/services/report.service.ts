import reportRepository from '../repositories/report.repository.js';
import { redis } from '../config/redisConnection.js';
import { IReport } from '../models/Report.js';
import ApiError from '../config/ApiError.js';
import { ERROR_CODES } from '../utils/errorCodes.js';

interface CreateReportParams {
  stationId: string,
  userId: string,
  issueType: string,
  description: string
}

const create = async ({ stationId, userId, issueType, description }: CreateReportParams): Promise<IReport> => {
  // Check if user has already reported this station
  const existing = await reportRepository.findByUserAndStation(userId, stationId);
  if (existing) {
    throw new ApiError('You have already reported this station', 409, ERROR_CODES.DUPLICATE_ENTRY);
  }

  // Create report
  const report = await reportRepository.create({
    user: userId as any,
    station: stationId as any,
    issueType,
    description,
  });

  // Invalidate station cache
  await redis.del(`station:${stationId}`);

  return report;
};

export default { create };
