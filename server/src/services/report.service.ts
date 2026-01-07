import reportRepository from '../repositories/report.repository.js';
import { redis } from '../config/redisConnection.js';
import { IReport } from '../models/Report.js';

interface CreateReportParams {
  stationId: string,
  userId: string,
  issueType: string,
  description: string
}

const create = async ({ stationId, userId, issueType, description }: CreateReportParams): Promise<IReport> => {
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
