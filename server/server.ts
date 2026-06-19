import app from './src/index.js';
import http from 'http';
import { initWebSocket, initRedisPubSubSubscriber } from './src/config/websocket.js';

const PORT: number | string = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize WebSocket server (attaches to HTTP server)
initWebSocket(server);

// Initialize Redis Pub/Sub subscriber so this server instance
// receives broadcasts from ALL other server instances
initRedisPubSubSubscriber();

server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.log(`Server running in production mode on port ${PORT}`);
  }
});
