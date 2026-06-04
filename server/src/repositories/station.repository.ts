import Station, { IStation } from '../models/Station.js';

const escapeRegex = (text: string): string => {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

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
    const escaped = escapeRegex(filters.search);
    query.$or = [
      { name: { $regex: escaped, $options: 'i' } },
      { location: { $regex: escaped, $options: 'i' } },
    ];
  }

  // Geospatial proximity filtering
  if (filters.latitude && filters.longitude) {
    const lat = Number(filters.latitude);
    const lng = Number(filters.longitude);
    const maxDistance = Number(filters.maxDistance) || 50000; // default 50km
    
    query.locationPoint = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
        $maxDistance: maxDistance,
      },
    };
  }

  return Station.find(query).sort(filters.latitude && filters.longitude ? undefined : { createdAt: -1 }).lean();
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

const search = (query: string): Promise<IStation[]> => {
  const escaped = escapeRegex(query);
  return Station.find({
    $or: [
      { name: { $regex: escaped, $options: 'i' } },
      { location: { $regex: escaped, $options: 'i' } },
    ],
  })
    .limit(5)
    .select('name location');
};

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
