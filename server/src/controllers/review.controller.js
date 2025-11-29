import { validationResult } from 'express-validator';
import reviewService from '../services/review.service.js';
import ApiError from '../config/ApiError.js';

const createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

    const { stationId } = req.params;
    const { rating, comment } = req.body;

    if (!stationId || !rating || !comment) {
      throw new ApiError(400, 'All fields are required.');
    }

    const review = await reviewService.create({
      stationId,
      userId: req.user.userId,
      rating,
      comment,
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviewsByStation = async (req, res, next) => {
  try {
    const { stationId } = req.params;

    if (!stationId) {
      throw new ApiError(400, 'Station ID is required.');
    }

    const reviews = await reviewService.getByStation(stationId);

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export default { createReview, getReviewsByStation };
