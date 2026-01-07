import Review, { IReview } from '../models/Review.js';

const create = (data: IReview): Promise<IReview> => Review.create(data);

const findByStation = (stationId: string): Promise<IReview[]> => {
  return Review.find({ station: stationId });
};

const findByStationPopulated = (stationId: string): Promise<IReview[]> => {
  return Review.find({ station: stationId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
};

export default { create, findByStation, findByStationPopulated };
