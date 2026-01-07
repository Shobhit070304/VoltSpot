import logger from '../config/Logger.js';
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

// 404 Not Found handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
};

// General error handler
const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let { statusCode, message } = err;

  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  logger.error({
    message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
  });

  // Only send stack trace in development
  const response = {
    status: 'error',
    statusCode,
    message,
  };

  console.error(err); // log to console
  res.status(statusCode).json(response);
};

export default { notFound, errorHandler };
