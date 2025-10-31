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

  res.status(statusCode).json(responseBody);
};


