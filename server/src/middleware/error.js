// 404 Not Found handler
export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const responseBody = {
    message: err.message || 'Internal Server Error',
  };

  // Expose stack only in development
  if (process.env.NODE_ENV === 'development') {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};


