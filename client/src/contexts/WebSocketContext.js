import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:9001");

export const WebSocketContext = createContext(socket);

export const WebSocketContextProvider = WebSocketContext.Provider;
