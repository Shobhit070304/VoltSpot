import express from 'express';
import { body } from 'express-validator';
import { authUser } from '../middleware/auth.middleware.js';
import stationController from '../controllers/station.controller.js';

const router = express.Router();

// Get all stations
router.get('/', stationController.getStations);

// Get my stations
router.get('/me', authUser, stationController.getMyStations);

// Get saved stations - MUST come before /:id route
router.get('/saved-stations', authUser, stationController.getSavedStations);

// Get suggested stations
router.get('/search', stationController.getStationSuggestions);

// Get station by ID
router.get('/:id', stationController.getStationById);

// Create a new station
router.post(
  '/create',
  authUser,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude')
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be between -90 and 90'),
    body('longitude')
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be between -180 and 180'),
    body('status')
      .isIn(['Active', 'Inactive'])
      .withMessage('Status must be Active or Inactive'),
    body('powerOutput')
      .isFloat({ min: 0 })
      .withMessage('Power output must be a positive number'),
    body('connectorType').notEmpty().withMessage('Connector type is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],
  stationController.createStation,
);

// Update a station
router.put(
  '/update/:id',
  authUser,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('latitude')
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be between -90 and 90'),
    body('longitude')
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude must be between -180 and 180'),
    body('status')
      .isIn(['Active', 'Inactive'])
      .withMessage('Status must be Active or Inactive'),
    body('powerOutput')
      .isFloat({ min: 0 })
      .withMessage('Power output must be a positive number'),
    body('connectorType').notEmpty().withMessage('Connector type is required'),
  ],
  stationController.updateStation,
);

// Delete a station
router.delete('/delete/:id', authUser, stationController.deleteStation);

// Save a station
router.post('/save/:id', authUser, stationController.saveStation);

// Estimate cost & time
// Add validation for { stationPower, pricePerKWh, evId, chargeFrom, chargeTo }
router.post(
  '/estimate',
  [
    body('stationPower')
      .isFloat({ min: 0 })
      .withMessage('Station power must be a positive number'),
    body('pricePerKWh')
      .isFloat({ min: 0 })
      .withMessage('Price per kWh must be a positive number'),
    body('evId').notEmpty().withMessage('EV ID is required'),
    body('chargeFrom')
      .isFloat({ min: 0, max: 100 })
      .withMessage('Charge from must be between 0 and 100'),
    body('chargeTo')
      .isFloat({ min: 0, max: 100 })
      .withMessage('Charge to must be between 0 and 100'),
  ],
  authUser,
  stationController.estimateChargingPrice,
);

export default router;
