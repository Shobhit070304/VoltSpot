import Report, { IReport } from '../models/Report.js';

const create = (data: Partial<IReport>): Promise<IReport> => {
  return Report.create(data);
};

const findAllReports = (): Promise<IReport[]> => {
  return Report.find();
};

const findByUserAndStation = (userId: string, stationId: string): Promise<IReport | null> => {
  return Report.findOne({ user: userId, station: stationId });
};

export default { create, findAllReports, findByUserAndStation };
