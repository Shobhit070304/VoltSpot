import { validationResult } from 'express-validator';
import reportService from '../services/report.service.js';
import ApiError from '../config/ApiError.js';

const createReport = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, errors.array()[0].msg);

  try {
    const { stationId } = req.params;
    const { comment } = req.body;

    if (!stationId || !comment)
      throw new ApiError(400, 'All fields are required.');

    const report = await reportService.create({
      stationId,
      userId: req.user.userId,
      comment,
    });

    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    next(error);
  }
};

export default { createReport };
