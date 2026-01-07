import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // max 100 requests
  message: 'Too many requests, please try again later.',
});

export default apiLimiter;
