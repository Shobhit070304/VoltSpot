import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
// @ts-ignore
import xss from 'xss-clean';

dotenv.config();

// Database and Cache
import connectDB from './config/db.js';
import { testConnection } from './config/redisConnection.js';

// Routes
import userRoutes from './routes/user.routes.js';
import stationRoutes from './routes/station.routes.js';
import reviewRoutes from './routes/review.routes.js';
import reportRoutes from './routes/report.routes.js';
import carRoutes from './routes/car.routes.js';

import apiLimiter from './config/rateLimiter.js';

// Error Handlers
import errorHandlerMiddleware from './middleware/error.middleware.js';

const app : Application = express();
// Connect to MongoDB
connectDB().catch((error : any) => {
  console.error('Failed to connect to MongoDB:', error.message);
  process.exit(1);
});
testConnection();

// CORS (restrict origins if needed via CORS_ORIGIN env)
app.use(
  cors({
    origin: [
      'https://voltspot.vercel.app', 
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL || 'https://voltspot.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }),
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// Rate Limiting
app.use('/api', apiLimiter);

// Compression middleware
app.use(
  compression({
    level: 6, // compression level
    threshold: 100, // only compress responses larger than 100 bytes
    filter: (req :  Request, res : Response) => {
      // don't compress responses with this header
      if (req.headers['x-no-compression']) {
        return false;
      }
      // use compression filter function
      return compression.filter(req, res);
    },
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/station', stationRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/car', carRoutes);

// 404 and Error handlers
app.use(errorHandlerMiddleware.notFound);
app.use(errorHandlerMiddleware.errorHandler);

export default app;
