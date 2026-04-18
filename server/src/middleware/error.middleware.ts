import logger from '../config/Logger.js';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.js';
import { ERROR_CODES } from '../utils/errorCodes.js';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
  keyValue?: Record<string, any>;
  path?: string;
  errors?: Record<string, any>;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  sendError(res, ERROR_CODES.NOT_FOUND, 'Route not found', 404);
};

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // Don't leak anything in production
  const isDev = process.env.NODE_ENV === 'development';

  // 1. Your own operational errors (thrown intentionally)
  if (err.isOperational) {
    logger.error({ message: err.message, statusCode: err.statusCode, path: req.originalUrl, method: req.method });
    return sendError(res, err.code || ERROR_CODES.INTERNAL_ERROR, err.message, err.statusCode || 500);
  }

  // 2. Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((e: any) => e.message).join(', ');
    logger.error({ message: 'Validation Error', details: message, path: req.originalUrl, method: req.method });
    return sendError(res, ERROR_CODES.VALIDATION_ERROR, message, 422);
  }

  // 3. Mongoose duplicate key (E11000)
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const message = `${field} already exists`;
    logger.error({ message: 'Duplicate Key Error', field, path: req.originalUrl, method: req.method });
    return sendError(res, ERROR_CODES.DUPLICATE_ENTRY, message, 409);
  }

  // 4. Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path || 'ID'}`;
    logger.error({ message: 'Cast Error', path: err.path, originalUrl: req.originalUrl, method: req.method });
    return sendError(res, ERROR_CODES.NOT_FOUND, message, 400);
  }

  // 5. JWT errors
  if (err.name === 'JsonWebTokenError') {
    logger.error({ message: 'Invalid JWT Token', path: req.originalUrl, method: req.method });
    return sendError(res, ERROR_CODES.UNAUTHORIZED, 'Invalid token', 401);
  }
  if (err.name === 'TokenExpiredError') {
    logger.error({ message: 'Expired JWT Token', path: req.originalUrl, method: req.method });
    return sendError(res, ERROR_CODES.UNAUTHORIZED, 'Token expired', 401);
  }

  // 6. Unknown errors - don't expose internals in production
  console.error('UNHANDLED ERROR:', err); // log the real error server-side
  logger.error({ 
    message: 'Unhandled Error', 
    error: err.message, 
    stack: err.stack, 
    path: req.originalUrl, 
    method: req.method 
  });
  
  return sendError(
    res,
    ERROR_CODES.INTERNAL_ERROR,
    isDev ? err.message : 'Something went wrong',
    500
  );
};

export default { notFound, errorHandler };
