import User, { IUser } from '../models/User.js';

const findByEmail = (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

const create = (data: Partial<IUser>): Promise<IUser> => {
  return User.create(data);
};

const findById = (id: string): Promise<IUser | null> => User.findById(id);

const getSaved = (id: string): Promise<IUser | null> =>
  User.findById(id).populate({
    path: 'savedStations',
    model: 'Station',
    select: 'name location status powerOutput connectorType latitude longitude',
  });

export default { findByEmail, create, findById, getSaved };
