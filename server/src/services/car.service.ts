import carsRepository from '../repositories/car.repository.js';
import { IEV } from '../models/Car.js';

const getAllEVs = async (): Promise<IEV[]> => {
  const cars = await carsRepository.findAllEVs();
  return cars;
};

export default { getAllEVs };
