import mongoose from 'mongoose';
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

const calculateAverageRating = async (stationId: string): Promise<number> => {
  const stats = await Review.aggregate([
    { $match: { station: new mongoose.Types.ObjectId(stationId) } },
    {
      $group: {
        _id: '$station',
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  return stats.length > 0 ? stats[0].avgRating : 0;
};

export default { create, findByStation, findByStationPopulated, calculateAverageRating };
