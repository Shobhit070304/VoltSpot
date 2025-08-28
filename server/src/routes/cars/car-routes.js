import express from "express";
import { fetchCars } from "../../controllers/cars/car-controllers.js";
import authUser from "../../middleware/auth.js";

const router = express.Router();

router.get("/evs", authUser, fetchCars);

export default router;
