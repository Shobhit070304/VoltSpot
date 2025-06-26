import express from "express";
import authUser from "../middleware/auth.js";
import { body } from "express-validator";

import {
  createReview,
  getReviewsByStation,
} from "../controllers/review-controllers.js";
const router = express.Router();

// Post review for a station
router.post("/:stationId", authUser, createReview);

// Get reviews for a station
router.get("/:stationId", authUser, getReviewsByStation);

export default router;
