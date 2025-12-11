import express from 'express';
import { authUser } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import reportControllers from '../controllers/report.controller.js';

const router = express.Router();

// Post a report
router.post(
  '/:stationId',
  [body('comment').notEmpty().withMessage('Comment is required')],
  authUser,
  reportControllers.createReport,
);

export default router;
