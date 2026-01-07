import Report, { IReport } from '../models/Report.js';

const create = (data: Partial<IReport>): Promise<IReport> => {
  return Report.create(data);
};

const findAllReports = (): Promise<IReport[]> => {
  return Report.find();
};

export default { create, findAllReports };
