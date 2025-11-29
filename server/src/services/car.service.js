import carsRepository from '../repositories/car.repository.js';

const getAllEVs = async () => {
  const cars = await carsRepository.findAllEVs();
  return cars;
};

export default { getAllEVs };
