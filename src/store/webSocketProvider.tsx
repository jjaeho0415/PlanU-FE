import { createContext, useContext, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext<{
  stompClient: Client | null;
  connectWebSocket: (startTime: string, accessToken: string) => void;
  isDisconnected: boolean;
  isConnected: boolean;
}>({
  stompClient: null,
  connectWebSocket: () => {},
  isDisconnected: false,
  isConnected: false,
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const stompClientRef = useRef<Client | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isWebSocketDisconnected, setIsWebSocketDisconnected] = useState<boolean>(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState<boolean>(false);

  const connectWebSocket = (startTime: string, accessToken: string) => {
    if (!accessToken || !startTime || stompClientRef.current) return;
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      onConnect: () => {
        setIsWebSocketConnected(true)
        // startTime + 1시간 뒤 자동 해제
        const now = new Date();
        const [hours, minutes] = startTime.split(":").map(Number);
        const startTimeDate = new Date(now);
        startTimeDate.setHours(hours, minutes, 0, 0);
        const endTime = new Date(startTimeDate.getTime() + 60 * 60 * 1000);

        const delay = Math.max(endTime.getTime() - now.getTime(), 0);

        timeoutRef.current = setTimeout(() => {
          disconnectWebSocket();
        }, delay);
      },
      onStompError: (frame) => {
        console.error("WebSocket 오류: ", frame);
      },
    });
    stompClientRef.current = client;
    setStompClient(client);
    stompClientRef.current.activate();
  };

  const disconnectWebSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
      setStompClient(null);
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsWebSocketConnected(false);
    setIsWebSocketDisconnected(true);
  };

  return (
    <WebSocketContext.Provider
      value={{ stompClient, connectWebSocket, isDisconnected: isWebSocketDisconnected, isConnected: isWebSocketConnected }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
