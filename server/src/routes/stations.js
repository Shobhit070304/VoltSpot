import express from 'express';
import { body } from 'express-validator';
import authUser from '../middleware/auth.js';
import { getStations, getMyStations, getStationById, createStation, updateStation, deleteStation } from '../controllers/station-controllers.js';
const router = express.Router();

// Get all stations
router.get('/', getStations);

// Get my stations
router.get('/me', authUser, getMyStations);

// Get station by ID
router.get('/:id', authUser, getStationById);

// Create a new station
router.post(
  '/create',
  authUser,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('status').isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),
    body('powerOutput').isFloat({ min: 0 }).withMessage('Power output must be a positive number'),
    body('connectorType').notEmpty().withMessage('Connector type is required')
  ],
  createStation
);

// Update a station
router.put(
  '/update/:id',
  authUser,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('status').isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive'),
    body('powerOutput').isFloat({ min: 0 }).withMessage('Power output must be a positive number'),
    body('connectorType').notEmpty().withMessage('Connector type is required')
  ],
  updateStation
);

// Delete a station
router.delete('/delete/:id', authUser, deleteStation);

export default router;