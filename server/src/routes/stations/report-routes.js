import express from "express";
import authUser from "../../middleware/auth.js";
import { body } from "express-validator";
import { createReport } from "../../controllers/stations/report-controllers.js";

const router = express.Router();

// Post a report
router.post("/:stationId", authUser, createReport);

export default router;
