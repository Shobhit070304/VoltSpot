import rateLimit from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { pubClient } from './redisPubSub.js';

/**
 * Distributed Rate Limiter using Redis as a shared counter store.
 *
 * Without Redis: Each server has its own in-memory counter.
 *   Attacker gets 100 req × N servers = bypassed limit.
 *
 * With Redis:    All servers share ONE counter in Redis.
 *   Attacker hits 100 req total across all servers → blocked everywhere.
 *
 * We reuse pubClient (ioredis TCP) here because rate-limit-redis needs
 * a sendCommand method that ioredis provides. The existing @upstash/redis
 * REST client does NOT expose this method.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // max 100 requests per IP per window
  message: 'Too many requests, please try again later.',
  standardHeaders: true,    // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,     // Disable the X-RateLimit-* headers
  store: new RedisStore({
    // rate-limit-redis needs a sendCommand function to talk to Redis.
    // ioredis exposes this via client.call() — we wrap it here.
    sendCommand: (...args: string[]) => pubClient.call(...(args as [string, ...string[]])) as any,
    prefix: 'rl:', // All rate-limit keys in Redis will be prefixed with "rl:"
  }),
});

export default apiLimiter;
