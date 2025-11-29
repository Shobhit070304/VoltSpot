import express from 'express';
import authUser from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

import reviewRoutes from '../controllers/review.controller.js';
const router = express.Router();

// Post review for a station
router.post(
  '/:stationId',
  [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
      .optional()
      .isString()
      .withMessage('Comment must be a string'),
  ],
  authUser,
  reviewRoutes.createReview,
);

// Get reviews for a station
router.get('/:stationId', reviewRoutes.getReviewsByStation);

export default router;
