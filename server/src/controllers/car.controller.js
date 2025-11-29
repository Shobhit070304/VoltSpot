import carService from '../services/car.service.js';

const fetchCars = async (req, res, next) => {
  try {
    const cars = await carService.getAllEVs();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export default { fetchCars };
