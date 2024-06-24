import React, { createContext, useContext } from "react";
import useWebSocketClient from "./useWebSocketClient";

const WebSocketClientContext = createContext(null);

const WebSocketClientProvider = ({ children }) => {
  const webSocketClient = useWebSocketClient();
  return <WebSocketClientContext.Provider value={webSocketClient}>{children}</WebSocketClientContext.Provider>;
};

const useWebSocketClientContext = () => {
  const webSocketClient = useContext(WebSocketClientContext);
  if (!webSocketClient) {
    throw new Error("useWebSocketClient should be used within WebSocketClientProvider");
  }
  return webSocketClient;
};

export { WebSocketClientProvider, useWebSocketClientContext };

