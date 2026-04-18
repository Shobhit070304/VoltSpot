import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import stationService from '../services/station.service.js';
import { validationResult } from 'express-validator';
import ApiError from '../config/ApiError.js';
import { sendSuccess, sendValidationError, sendNoContent } from '../utils/response.js';

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
    sendSuccess(res, { stations });
  } catch (error) {
    next(error);
  }
};

const getMyStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stations = await stationService.getMyStations((req as AuthRequest).user.userId);
    sendSuccess(res, { stations });
  } catch (error) {
    next(error);
  }
};

const getStationById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    sendSuccess(res, { station });
  } catch (error) {
    next(error);
  }
};

const createStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const station = await stationService.create({
      body: req.body,
      userId: (req as AuthRequest).user.userId,
    });
    
    // Set Location header pointing to the new resource
    res.setHeader('Location', `/api/stations/${station._id}`);
    sendSuccess(res, { station }, 201, req);
  } catch (error) {
    next(error);
  }
};

const updateStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const station = await stationService.update({
      stationId: req.params.id,
      userId: (req as AuthRequest).user.userId,
      body: req.body,
    });
    sendSuccess(res, { station });
  } catch (error) {
    next(error);
  }
};

const deleteStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await stationService.remove(req.params.id, (req as AuthRequest).user.userId);
    sendNoContent(res);
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
    
    if (result.action === 'unsaved') {
      return sendNoContent(res); // 204 for unsave
    }
    
    sendSuccess(res, { message: 'Station saved successfully', savedStations: result.savedStations }, 201, req);
  } catch (error) {
    next(error);
  }
};

const getSavedStations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const savedStations = await stationService.getSaved((req as AuthRequest).user.userId);
    sendSuccess(res, { savedStations });
  } catch (error) {
    next(error);
  }
};

const getStationSuggestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stations = await stationService.suggestions(req.query.query as string);
    sendSuccess(res, stations);
  } catch (error) {
    next(error);
  }
};

const estimateChargingPrice = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendValidationError(res, errors.array()[0].msg);
    return;
  }
  try {
    const data = await stationService.estimateCharging(req.body);
    sendSuccess(res, data);
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
