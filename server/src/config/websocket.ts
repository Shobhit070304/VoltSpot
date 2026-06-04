import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

let wss: WebSocketServer | null = null;

export const initWebSocket = (server: Server): WebSocketServer => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('New WebSocket connection established.');
    }

    ws.on('message', (message: string) => {
      try {
        const parsed = JSON.parse(message);
        if (parsed.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong' }));
        }
      } catch (err) {
        // Ignore parsing error
      }
    });

    ws.on('close', () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket connection closed.');
      }
    });
  });

  return wss;
};

export const broadcast = (type: string, data: any): void => {
  if (!wss) return;

  const payload = JSON.stringify({ type, data });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
};
