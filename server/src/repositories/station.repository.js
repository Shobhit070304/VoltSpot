import Station from '../models/Station.js';

const findAll = () => Station.find().lean();
const findByUser = (userId) => Station.find({ createdBy: userId }).lean();
const findById = (id) => Station.findById(id);
const create = (data) => Station.create(data);

const update = (id, userId, data) => {
  return Station.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...data, updatedAt: Date.now() },
    { new: true, runValidators: true },
  );
};

const deleteStation = (id, userId) => {
  return Station.findOneAndDelete({ _id: id, createdBy: userId });
};

const search = (query) =>
  Station.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } },
    ],
  })
    .limit(5)
    .select('name location');

const updateAverageRating = (stationId, avg) => {
  return Station.findByIdAndUpdate(stationId, {
    averageRating: avg,
  });
};

export default {
  findAll,
  findByUser,
  findById,
  create,
  update,
  delete: deleteStation,
  search,
  updateAverageRating,
};
