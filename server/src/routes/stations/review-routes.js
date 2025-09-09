import express from "express";
import authUser from "../../middleware/auth.js";

import {
  createReview,
  getReviewsByStation,
} from "../../controllers/stations/review-controllers.js";
const router = express.Router();

// Post review for a station
router.post("/:stationId", authUser, createReview);

// Get reviews for a station
router.get("/:stationId", getReviewsByStation);

export default router;
