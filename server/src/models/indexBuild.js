import mongoose from "mongoose";
import dotenv from "dotenv";
import  connectDB  from "../config/db.js";

import User from "./users/User.js";
import Station from "./stations/Station.js";
import Review from "./stations/Review.js";
import Report from "./stations/Report.js";
import Car from "./cars/EV.js";

dotenv.config();

// Connect to MongoDB
connectDB().catch((error) => {
  process.exit(1);
});

const indexBuild = async () => {
  try {
    await User.syncIndexes();
    await Station.syncIndexes();
    await Review.syncIndexes();
    await Report.syncIndexes();
    await Car.syncIndexes();
  } catch (error) {
    // Silent error handling for production
  }
};

indexBuild();

export default indexBuild;
