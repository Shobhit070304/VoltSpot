import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth-routes.js";
import stationRoutes from "./routes/station-routes.js";
import reviewRoutes from "./routes/review-routes.js";
import reportRoutes from "./routes/report-routes.js";

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/report", reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

export default app;
