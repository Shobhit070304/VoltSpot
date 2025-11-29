import express from 'express';
import carController from '../controllers/car.controller.js';
import authUser from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/evs', authUser, carController.fetchCars);

export default router;
