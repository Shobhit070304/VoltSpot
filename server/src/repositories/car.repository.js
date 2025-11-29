import EV from '../models/Car.js';

const findAllEVs = () => {
  return EV.find();
};

const findById = (evId) => EV.findById(evId);

export default { findAllEVs, findById };
