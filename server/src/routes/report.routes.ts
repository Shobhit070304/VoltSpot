import express from 'express';
import { authUser } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import reportControllers from '../controllers/report.controller.js';

const router = express.Router();

// Post a report
router.post(
  '/create/:stationId',
  [
    body('issueType').notEmpty().withMessage('Issue type is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  authUser,
  reportControllers.createReport,
);

export default router;
