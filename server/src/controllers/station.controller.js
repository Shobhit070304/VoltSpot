import stationService from '../services/station.service.js';
import { validationResult } from 'express-validator';
import ApiError from '../config/ApiError.js';

const getStations = async (req, res, next) => {
  try {
    const stations = await stationService.getAllStations();
    res.status(200).json({ stations });
  } catch (error) {
    next(error);
  }
};

const getMyStations = async (req, res, next) => {
  try {
    const stations = await stationService.getMyStations(req.user.userId);
    res.status(200).json({ stations });
  } catch (error) {
    next(error);
  }
};

const getStationById = async (req, res, next) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    res.status(200).json({ station });
  } catch (error) {
    next(error);
  }
};

const createStation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

    const station = await stationService.create({
      body: req.body,
      userId: req.user.userId,
    });

    res.status(201).json(station);
  } catch (error) {
    next(error);
  }
};

const updateStation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

    const station = await stationService.update({
      stationId: req.params.id,
      userId: req.user.userId,
      body: req.body,
    });

    res.status(200).json(station);
  } catch (error) {
    next(error);
  }
};

const deleteStation = async (req, res, next) => {
  try {
    await stationService.remove(req.params.id, req.user.userId);
    res.status(200).json({ message: 'Station deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const saveStation = async (req, res, next) => {
  try {
    const result = await stationService.toggleSave({
      userId: req.user.userId,
      stationId: req.params.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getSavedStations = async (req, res, next) => {
  try {
    const savedStations = await stationService.getSaved(req.user.userId);
    res.status(200).json({ savedStations });
  } catch (error) {
    next(error);
  }
};

const getStationSuggestions = async (req, res, next) => {
  try {
    const stations = await stationService.suggestions(req.query.query);
    res.json(stations);
  } catch (error) {
    next(error);
  }
};

const estimateChargingPrice = async (req, res, next) => {
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
