import Review from '../models/Review.js';

const create = (data) => Review.create(data);

const findByStation = (stationId) => {
  return Review.find({ station: stationId });
};

const findByStationPopulated = (stationId) => {
  return Review.find({ station: stationId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });
};

export default { create, findByStation, findByStationPopulated };
