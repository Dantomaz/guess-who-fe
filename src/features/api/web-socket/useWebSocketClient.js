import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { parsePossibleJSONFromString } from "../../../global/utils";
import { API_QUEUE_ERROR, API_SOCKET_URL } from "../api";

const useWebSocketClient = () => {
  const stompClient = useRef(null);
  const webSocketError = useRef(null);
  const subscriptions = useRef([]);

  useEffect(() => {
    createStompClient();

    return () => disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createStompClient = () => {
    const client = new Client({
      brokerURL: API_SOCKET_URL,
      onConnect: onConnect,
      onWebSocketError: onWebSocketError,
      onStompError: onStompError,
      onWebSocketClose: onWebSocketClose,
    });
    client.activate();
    stompClient.current = client;
  };

  const onConnect = () => {
    console.log("connected: ", stompClient.current.connected);
    if (stompClient.current.connected) {
      subscribe(API_QUEUE_ERROR, (error) => handleWebSocketError(error));
    }
  };

  const handleWebSocketError = (error) => {
    console.error(error);
    webSocketError.current = error;
  };

  const onWebSocketError = (error) => {
    console.error("WebSocket error: ", error);
  };

  const onStompError = (frame) => {
    console.error("Broker reported error: ", frame.header["message"]);
    console.error("Additional details: ", frame.body);
  };

  const onWebSocketClose = (frame) => {
    console.log("connected: ", stompClient.current.connected);
  };

  const disconnect = () => {
    if (!stompClient.current.connected) {
      console.error(`Cannot disconnect - no connection established`);
      return;
    }

    subscriptions.current.forEach((subscription) => subscription.unsubscribe());
    stompClient.current.deactivate();
  };

  const subscribe = (destination, callback) => {
    if (!stompClient.current.connected) {
      console.error(`Cannot subscribe to ${destination} - no connection established. Connecting...`);
      return;
    }
    const newSubscription = stompClient.current.subscribe(destination, (frame) => {
      callback(parsePossibleJSONFromString(frame.body));
    });
    subscriptions.current.push(newSubscription);
  };

  const publish = (destination, body) => {
    if (!stompClient.current.connected) {
      console.error(`Cannot publish to ${destination} - no connection established. Connecting...`);
      return;
    }

    return promisePublishing(destination, body)
      .then((response) => {
        console.log("-------------- publish ----------------");
        console.error("webSocketError: ", webSocketError.current);
        if (webSocketError.current) {
          throw new Error(webSocketError.current);
        }
        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const promisePublishing = (destination, body) => {
    return new Promise((resolve, reject) => {
      // webSocketError.current = null;
      if (!stompClient.current.connected) {
        reject();
      }
      stompClient.current.publish({ destination, body: JSON.stringify(body) });
      resolve();
    });
  };

  return { disconnect, subscribe, publish, webSocketError };
};

export default useWebSocketClient;
