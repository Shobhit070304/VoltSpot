import { Request, Response, NextFunction } from 'express';
import carService from '../services/car.service.js';
import { sendSuccess } from '../utils/response.js';

const fetchCars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cars = await carService.getAllEVs();
    sendSuccess(res, { cars });
  } catch (error) {
    next(error);
  }
};

export default { fetchCars };
