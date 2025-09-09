import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/users/auth-routes.js";
import stationRoutes from "./routes/stations/station-routes.js";
import reviewRoutes from "./routes/stations/review-routes.js";
import reportRoutes from "./routes/stations/report-routes.js";
import carRoutes from "./routes/cars/car-routes.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

// =============================================================
// Express App Initialization
// -------------------------------------------------------------
// Configures core middlewares, security, rate limiting,
// compression, routing, and global error handling.
// =============================================================
const app = express();

// Connect to MongoDB
connectDB().catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1);
});

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// HTTP request logging (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Simple rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Compression middleware
app.use(
  compression({
    level: 6, // compression level
    threshold: 100, // only compress responses larger than 100 bytes 
    filter: (req, res) => {
      // don't compress responses with this header
      if (req.headers["x-no-compression"]) {
        return false;
      }
      // use compression filter function
      return compression.filter(req, res);
    },
  })
);

// CORS (restrict origins if needed via CORS_ORIGIN env)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/station", stationRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/car", carRoutes);

// 404 and Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
