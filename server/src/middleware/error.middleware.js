import logger from '../config/Logger.js';

// 404 Not Found handler
export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

// General error handler
const errorHandler = (err, req, res, next) => {
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
