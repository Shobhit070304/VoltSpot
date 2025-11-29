import User from '../models/User.js';

const findByEmail = (email) => {
  return User.findOne({ email });
};

const create = (data) => {
  return User.create(data);
};

const findById = (id) => User.findById(id);

const getSaved = (id) =>
  User.findById(id).populate({
    path: 'savedStations',
    model: 'Station',
    select: 'name location status powerOutput connectorType latitude longitude',
  });

export default { findByEmail, create, findById, getSaved };
