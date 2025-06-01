import Station from '../models/Station.js';
import { validationResult } from 'express-validator';

// Get all stations
const getStations = async (req, res, next) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (error) {
        next(error);
    }
}

// Get my stations
const getMyStations = async (req, res, next) => {
    try {
        const stations = await Station.find({ createdBy: req.user.userId });
        res.status(200).json({stations});
    } catch (error) {
        next(error);
    }
}

// Get station by ID
const getStationById = async (req, res, next) => {
    try {
        const station = await Station.findOne({
            _id: req.params.id,
            createdBy: req.user.userId
        });

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        res.status(200).json({station});
    } catch (error) {
        next(error);
    }
}

// Create station
const createStation = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const {
            name,
            location,
            latitude,
            longitude,
            status,
            powerOutput,
            connectorType
        } = req.body;

        const station = await Station.create({
            name,
            location,
            latitude,
            longitude,
            status,
            powerOutput,
            connectorType,
            createdBy: req.user.userId
        });

        res.status(200).json(station);
    } catch (error) {
        next(error);
    }
}

// Update station
const updateStation = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const {
            name,
            location,
            latitude,
            longitude,
            status,
            powerOutput,
            connectorType
        } = req.body;

        const station = await Station.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user.userId },
            {
                name,
                location,
                latitude,
                longitude,
                status,
                powerOutput,
                connectorType,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        res.status(200).json(station);
    } catch (error) {
        next(error);
    }
}

// Delete station
const deleteStation = async (req, res, next) => {
    try {
        const station = await Station.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.userId
        });

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        res.status(200).json({ message: 'Station deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export { getStations, getMyStations, getStationById, createStation, updateStation, deleteStation };