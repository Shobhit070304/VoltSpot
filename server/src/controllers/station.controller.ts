import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import stationService from '../services/station.service.js';
import { validationResult } from 'express-validator';
import ApiError from '../config/ApiError.js';

const getStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = {
      status: req.query.status,
      connectorType: req.query.connectorType,
      minPower: req.query.minPower,
      maxPower: req.query.maxPower,
      search: req.query.search,
    };

    const stations = await stationService.getAllStations(filters);
    res.status(200).json({ stations });
  } catch (error) {
    next(error);
  }
};

const getMyStations = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const stations = await stationService.getMyStations((req as AuthRequest).user.userId);
    res.status(200).json({ stations });
  } catch (error) {
    next(error);
  }
};

const getStationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    res.status(200).json({ station });
  } catch (error) {
    next(error);
  }
};

const createStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

    const station = await stationService.create({
      body: req.body,

      userId: (req as AuthRequest).user.userId,
    });

    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

const updateStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

    const station = await stationService.update({
      stationId: req.params.id,

      userId: (req as AuthRequest).user.userId,
      body: req.body,
    });

    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

const deleteStation = async (req: Request, res: Response, next: NextFunction) => {
  try {

    await stationService.remove(req.params.id, (req as AuthRequest).user.userId);
    res.status(200).json({ message: 'Station deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const saveStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await stationService.toggleSave({

      userId: (req as AuthRequest).user.userId,
      stationId: req.params.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSavedStations = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const savedStations = await stationService.getSaved((req as AuthRequest).user.userId);
    res.status(200).json({ savedStations });
  } catch (error) {
    next(error);
  }
};

const getStationSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stations = await stationService.suggestions(req.query.query as string);
    res.json(stations);
  } catch (error) {
    next(error);
  }
};

const estimateChargingPrice = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);
  try {
    const data = await stationService.estimateCharging(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  getStations,
  getMyStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  saveStation,
  getSavedStations,
  getStationSuggestions,
  estimateChargingPrice,
};
