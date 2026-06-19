import { useEffect, useRef, useCallback } from "react";

/**
 * useWebSocket
 *
 * A reusable hook that manages a WebSocket connection with:
 *  1. Application-level Ping/Pong heartbeat — mirrors the server's 30s heartbeat.
 *     The server sends a native WS ping frame every 30s. Raw WebSocket in browsers
 *     automatically handles native ping/pong at the protocol level, but the server
 *     ALSO supports JSON { type: "ping" } messages. We send those every 25s so we
 *     respond BEFORE the server's 30s+10s kill window.
 *  2. Auto-reconnect with exponential backoff — if the connection drops (network
 *     glitch, server restart), we try to reconnect after a delay.
 *  3. Clean teardown on component unmount.
 *
 * @param {function} onMessage - called with a parsed JSON message object when received
 * @returns {{ readyState: number }} - current WebSocket readyState
 */

const WS_URL = (import.meta.env.VITE_BASE_URL || "http://localhost:5000/api")
  .replace("http://", "ws://")
  .replace("https://", "wss://")
  .replace("/api", "");

// Send a ping every 25s (server kills after 30s + 10s timeout = 40s without pong)
const PING_INTERVAL_MS = 25_000;

// Reconnect delays: 1s, 2s, 4s, 8s, 16s (capped at 30s)
const RECONNECT_BASE_DELAY_MS = 1_000;
const RECONNECT_MAX_DELAY_MS = 30_000;

const useWebSocket = (onMessage) => {
  const socketRef = useRef(null);
  const pingIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);
  const onMessageRef = useRef(onMessage);

  // Keep the callback ref fresh without re-triggering the effect
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const clearPingInterval = () => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  };

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    if (!isMountedRef.current) return;

    // Don't open a second socket if one is already open/connecting
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const socket = new WebSocket(WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      if (!isMountedRef.current) return;
      reconnectAttemptsRef.current = 0; // Reset backoff on successful connect

      // Start application-level ping loop
      clearPingInterval();
      pingIntervalRef.current = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
        }
      }, PING_INTERVAL_MS);
    };

    socket.onmessage = (event) => {
      if (!isMountedRef.current) return;
      try {
        const message = JSON.parse(event.data);

        // Silently swallow pong replies — they are heartbeat control messages
        if (message.type === "pong") return;

        onMessageRef.current(message);
      } catch {
        // Ignore malformed messages
      }
    };

    socket.onclose = (event) => {
      clearPingInterval();
      if (!isMountedRef.current) return;

      // Don't reconnect on intentional close (code 1000 = normal closure)
      if (event.code === 1000) return;

      // Exponential backoff reconnect
      const delay = Math.min(
        RECONNECT_BASE_DELAY_MS * 2 ** reconnectAttemptsRef.current,
        RECONNECT_MAX_DELAY_MS
      );
      reconnectAttemptsRef.current += 1;

      reconnectTimeoutRef.current = setTimeout(() => connect(), delay);
    };

    socket.onerror = () => {
      // onclose will fire after onerror and handle reconnect
      socket.close();
    };
  }, []); // No deps — connect is stable, reads isMounted via ref

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      clearPingInterval();
      clearReconnectTimeout();

      // Normal close (code 1000) — prevents reconnect loop on unmount
      if (socketRef.current) {
        socketRef.current.close(1000, "Component unmounted");
        socketRef.current = null;
      }
    };
  }, [connect]);
};

export default useWebSocket;
