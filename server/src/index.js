import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

// Routes
import authRoutes from "./routes/users/auth-routes.js";
import stationRoutes from "./routes/stations/station-routes.js";
import reviewRoutes from "./routes/stations/review-routes.js";
import reportRoutes from "./routes/stations/report-routes.js";
import carRoutes from "./routes/cars/car-routes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
});

// Simple rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/car", carRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

export default app;
