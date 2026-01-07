import { Request, Response, NextFunction } from 'express';
import carService from '../services/car.service.js';

const fetchCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cars = await carService.getAllEVs();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export default { fetchCars };