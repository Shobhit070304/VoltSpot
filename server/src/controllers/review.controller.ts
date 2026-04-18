import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import reviewService from '../services/review.service.js';
import ApiError from '../config/ApiError.js';
import { sendSuccess, sendValidationError } from '../utils/response.js';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const { stationId } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      sendValidationError(res, 'Rating is required.');
      return;
    }

    const review = await reviewService.create({
      stationId,
      // @ts-ignore
      userId: req.user.userId,
      rating,
      comment,
    });

    sendSuccess(res, { message: 'Review submitted successfully', review }, 201, req);
  } catch (error) {
    next(error);
  }
};

const getReviewsByStation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stationId } = req.params;
    const reviews = await reviewService.getByStation(stationId);
    sendSuccess(res, { reviews });
  } catch (error) {
    next(error);
  }
};

export default { createReview, getReviewsByStation };
