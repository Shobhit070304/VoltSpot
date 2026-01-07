import Station, { IStation } from '../models/Station.js';

const findAll = (filters: any = {}): Promise<IStation[]> => {
  const query: any = {};

  if (filters.status) query.status = filters.status;
  if (filters.connectorType) query.connectorType = filters.connectorType;
  if (filters.minPower || filters.maxPower) {
    query.powerOutput = {};
    if (filters.minPower) query.powerOutput.$gte = Number(filters.minPower);
    if (filters.maxPower) query.powerOutput.$lte = Number(filters.maxPower);
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { location: { $regex: filters.search, $options: 'i' } },
    ];
  }

  return Station.find(query).sort({ createdAt: -1 }).lean();
};
const findByUser = (userId: string): Promise<IStation[]> => Station.find({ createdBy: userId }).lean();
const findById = (id: string): Promise<IStation | null> => Station.findById(id);
const create = (data: IStation): Promise<IStation> => Station.create(data);

const update = (id: string, userId: string, data: Partial<IStation>): Promise<IStation | null> => {
  return Station.findOneAndUpdate(
    { _id: id, createdBy: userId },
    { ...data, updatedAt: Date.now() },
    { new: true, runValidators: true },
  );
};

const deleteStation = (id: string, userId: string): Promise<IStation | null> => {
  return Station.findOneAndDelete({ _id: id, createdBy: userId });
};

const search = (query: string): Promise<IStation[]> =>
  Station.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } },
    ],
  })
    .limit(5)
    .select('name location');

const updateAverageRating = (stationId: string, avg: number): Promise<IStation | null> => {
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
