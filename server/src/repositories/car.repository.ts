import EV, {IEV} from '../models/Car.js';

const findAllEVs = (): Promise<IEV[]> => {
  return EV.find();
};

const findById = (evId: string): Promise<IEV | null> => EV.findById(evId);

export default { findAllEVs, findById };
