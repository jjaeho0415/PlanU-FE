import { createContext, useContext, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext<{
  stompClient: Client | null;
  connectWebSocket: (startTime: string, endTime: string, accessToken: string) => void;
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

  const connectWebSocket = (startTime: string, endTime: string, accessToken: string) => {
    if (!accessToken || !startTime || !endTime || stompClientRef.current) {
      return;
    }
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      onConnect: () => {
        setIsWebSocketConnected(true);
        // startTime + 1시간 뒤 자동 해제
        const now = new Date();
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        
        const startTimeDate = new Date(now);
        startTimeDate.setHours(startHours, startMinutes, 0, 0);

        const endTimeDate = new Date(now);
        endTimeDate.setHours(endHours, endMinutes, 0, 0);

        let disconnectAt: Date;
        const isAllDay = startTime === "00:00" && endTime === "23:59";

         if (isAllDay) {
           disconnectAt = endTimeDate;
         } else {
           disconnectAt = new Date(startTimeDate.getTime() + 60 * 60 * 1000); // +1시간
         }
        
        const delay = Math.max(disconnectAt.getTime() - now.getTime(), 0);

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
      value={{
        stompClient,
        connectWebSocket,
        isDisconnected: isWebSocketDisconnected,
        isConnected: isWebSocketConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
