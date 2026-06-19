import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { pubClient, subClient, STATION_CHANNEL } from './redisPubSub.js';

// ─── Heartbeat Config ────────────────────────────────────────────────────────
const PING_INTERVAL_MS = 30_000; // Ping every 30 seconds
const PONG_TIMEOUT_MS = 10_000;  // If no pong within 10s after ping → terminate

// Extend the ws type to track liveness
interface AliveWebSocket extends WebSocket {
  isAlive: boolean;
  pongTimeout?: ReturnType<typeof setTimeout>;
}

let wss: WebSocketServer | null = null;

// ─── Init WebSocket Server ───────────────────────────────────────────────────
export const initWebSocket = (server: Server): WebSocketServer => {
  wss = new WebSocketServer({ server });

  // Start the heartbeat interval once the server is up
  const heartbeatInterval = setInterval(() => {
    if (!wss) return;
    wss.clients.forEach((rawClient) => {
      const client = rawClient as AliveWebSocket;

      // Client didn't respond to last ping → dead connection, clean it up
      if (client.isAlive === false) {
        if (process.env.NODE_ENV === 'development') {
          console.log('[WS] Terminating ghost connection (no pong received).');
        }
        return client.terminate();
      }

      // Mark as "not alive" before sending ping.
      // If pong arrives, the 'pong' listener will flip it back to true.
      client.isAlive = false;

      // Set a hard timeout: if pong doesn't arrive in time, terminate
      client.pongTimeout = setTimeout(() => {
        if (client.isAlive === false) {
          if (process.env.NODE_ENV === 'development') {
            console.log('[WS] Pong timeout reached — terminating stale connection.');
          }
          client.terminate();
        }
      }, PONG_TIMEOUT_MS);

      client.ping();
    });
  }, PING_INTERVAL_MS);

  // Clean up the interval when the server closes to avoid memory leaks
  wss.on('close', () => clearInterval(heartbeatInterval));

  wss.on('connection', (rawWs: WebSocket) => {
    const ws = rawWs as AliveWebSocket;
    ws.isAlive = true; // Mark as alive on fresh connection

    if (process.env.NODE_ENV === 'development') {
      console.log('[WS] New connection established.');
    }

    // When client sends a pong, cancel the hard timeout and mark as alive
    ws.on('pong', () => {
      ws.isAlive = true;
      if (ws.pongTimeout) clearTimeout(ws.pongTimeout);
    });

    ws.on('message', (message: string) => {
      try {
        const parsed = JSON.parse(message.toString());
        // Handle legacy application-level pings from the client
        if (parsed.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch {
        // Ignore malformed messages
      }
    });

    ws.on('close', () => {
      if (ws.pongTimeout) clearTimeout(ws.pongTimeout);
      if (process.env.NODE_ENV === 'development') {
        console.log('[WS] Connection closed.');
      }
    });
  });

  return wss;
};

// ─── Setup Redis Pub/Sub Subscriber ─────────────────────────────────────────
// Call this ONCE at server startup. It connects the subClient to Redis and
// listens for station events published by any server instance.
export const initRedisPubSubSubscriber = async (): Promise<void> => {
  try {
    if (subClient.status === 'wait') {
      await subClient.connect();
    }
    if (pubClient.status === 'wait') {
      await pubClient.connect();
    }

    // Subscribe to the shared channel
    await subClient.subscribe(STATION_CHANNEL);

    // When a message arrives on the channel, broadcast to THIS server's clients
    subClient.on('message', (channel: string, message: string) => {
      if (channel !== STATION_CHANNEL) return;

      try {
        const { type, data } = JSON.parse(message);
        broadcastLocally(type, data);
      } catch {
        // Ignore malformed pub/sub messages
      }
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[RedisPubSub] Subscribed to channel: ${STATION_CHANNEL}`);
    }
  } catch (err: any) {
    console.error('[RedisPubSub] Failed to initialize subscriber:', err.message);
  }
};

// ─── Internal: broadcast only to THIS server's local WS clients ──────────────
const broadcastLocally = (type: string, data: any): void => {
  if (!wss) return;
  const payload = JSON.stringify({ type, data });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
};

// ─── Public: Publish to Redis so ALL servers broadcast the update ────────────
// station.service.ts calls this instead of directly calling broadcastLocally.
// The event flows: this server → Redis → all server instances → their WS clients
export const broadcast = async (type: string, data: any): Promise<void> => {
  try {
    const payload = JSON.stringify({ type, data });
    await pubClient.publish(STATION_CHANNEL, payload);
  } catch (err: any) {
    console.error('[RedisPubSub] Publish failed, falling back to local broadcast:', err.message);
    // Graceful fallback: broadcast only to local clients if Redis is down
    broadcastLocally(type, data);
  }
};
