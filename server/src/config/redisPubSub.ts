import dotenv from 'dotenv';
dotenv.config();
import { Redis } from 'ioredis';

/**
 * IMPORTANT: @upstash/redis uses REST (HTTP) — it CANNOT hold a persistent
 * TCP connection needed for Pub/Sub. We use ioredis here, which maintains
 * a persistent TCP socket to Upstash's rediss:// endpoint.
 *
 * UPSTASH_REDIS_TCP_URL format:  rediss://:PASSWORD@HOST:PORT
 */
const REDIS_TCP_URL = process.env.UPSTASH_REDIS_TCP_URL!;

if (!REDIS_TCP_URL) {
  console.error('[RedisPubSub] UPSTASH_REDIS_TCP_URL is not set. Pub/Sub will not work.');
}

// Publisher: used to PUBLISH events into a channel
const pubClient = new Redis(REDIS_TCP_URL, {
  tls: {}, // Required for rediss:// (TLS) connections (Upstash enforces TLS)
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

// Subscriber: used to SUBSCRIBE and listen to a channel.
// Note: Once a Redis client enters subscribe mode, it can ONLY run
// subscribe/unsubscribe commands — that's why we need two separate clients.
const subClient = new Redis(REDIS_TCP_URL, {
  tls: {},
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

pubClient.on('error', (err) => console.error('[RedisPubSub] Publisher error:', err.message));
subClient.on('error', (err) => console.error('[RedisPubSub] Subscriber error:', err.message));

const STATION_CHANNEL = 'voltspot:station-events';

export { pubClient, subClient, STATION_CHANNEL };
