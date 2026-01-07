import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import reportService from '../services/report.service.js';
import ApiError from '../config/ApiError.js';

const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, errors.array()[0].msg);
    }

    const { stationId } = req.params;
    const { issueType, description } = req.body;
    
    if (!stationId || !issueType || !description) {
      throw new ApiError(400, 'All fields are required.');
    }

    const report = await reportService.create({
      stationId,
      // @ts-ignore
      userId: req.user.userId,
      issueType,
      description,
    });

    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (error) {
    next(error);
  }
};

export default { createReport };