import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import reportService from '../services/report.service.js';
import ApiError from '../config/ApiError.js';
import { sendSuccess, sendValidationError } from '../utils/response.js';

const createReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      sendValidationError(res, errors.array()[0].msg);
      return;
    }

    const { stationId, issueType, description } = req.body;

    if (!stationId || !issueType || !description) {
      sendValidationError(res, 'All fields are required.');
      return;
    }

    const report = await reportService.create({
      stationId,
      // @ts-ignore
      userId: req.user.userId,
      issueType,
      description,
    });

    sendSuccess(res, { message: 'Report submitted successfully', report }, 201, req);
  } catch (error) {
    next(error);
  }
};

export default { createReport };
