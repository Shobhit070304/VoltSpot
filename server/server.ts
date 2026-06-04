import app from './src/index.js';
import http from 'http';
import { initWebSocket } from './src/config/websocket.js';

const PORT: number | string = process.env.PORT || 5000;

const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on port ${PORT}`);
  } else {
    console.log(`Server running in production mode on port ${PORT}`);
  }
});
