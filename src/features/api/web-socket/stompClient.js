import { Client } from "@stomp/stompjs";
import { parsePossibleJSONFromString } from "../../../global/utils";
import store from "../../../store";
import { subscribeQueueError } from "../apiRequest";

const subscriptions = {};
const subscriptionsToRetry = [];

const onConnect = () => {
  console.log("Web Socket connection established (connected: ", client.connected, ")");
  if (client.connected) {
    subscribeQueueError({ callback: (error) => handleWebSocketError(error) });
    subscriptionsToRetry.forEach(({ destination, callback }) => subscribe(destination, callback));
    subscriptionsToRetry.length = 0; // no more subscriptions to retry
  }
};

const handleWebSocketError = (error) => {
  console.error(error);
};

const onWebSocketError = (error) => {
  console.error("WebSocket error: ", error);
};

const onStompError = (frame) => {
  console.error("Broker reported error: ", frame.header["message"]);
  console.error("Additional details: ", frame.body);
};

const onWebSocketClose = (frame) => {
  console.log("Web Socket connection lost (connected: ", client.connected, ")");
};

const client = new Client({
  brokerURL: process.env.REACT_APP_SERVER_WEBSOCKET_URL,
  onConnect: onConnect,
  onWebSocketError: onWebSocketError,
  onStompError: onStompError,
  onWebSocketClose: onWebSocketClose,
});

export const connect = () => {
  if (client.connected) {
    console.error(`Client already disconnected`);
    return;
  }

  client.activate();
};

export const disconnect = () => {
  if (!client.connected) {
    console.error(`Cannot disconnect - no connection established`);
    return;
  }

  unsubscribeAll();
  client.deactivate();
};

export const subscribe = (destination, callback) => {
  if (!client.connected) {
    console.error(`Cannot subscribe to ${destination} - no connection established. Adding destination to queue.`);
    subscriptionsToRetry.push({ destination, callback });
    return;
  }

  if (subscriptions[destination]) {
    console.log(`Already subscribed to ${destination}`);
    return;
  }

  const newSubscription = client.subscribe(destination, (frame) => {
    callback(parsePossibleJSONFromString(frame.body));
  });

  console.log(`Subscribed to ${destination}`);
  subscriptions[destination] = newSubscription;
};

export const publish = (destination, body) => {
  if (store.getState().lockManager.isApiRequestPending) {
    return Promise.reject("Another request is pending");
  }

  if (!client.connected) {
    console.error(`Cannot publish to ${destination} - no connection established.`);
    return;
  }

  client.publish({ destination, body: JSON.stringify(body) });
};

export const unsubscribe = (destination) => {
  if (!subscriptions[destination]) {
    console.error(`No subscription found for ${destination}`);
    return;
  }

  subscriptions[destination].unsubscribe();
  delete subscriptions[destination];
  console.log(`Unsubscribed from ${destination}`);
};

export const unsubscribeTeams = () => {
  const teamTopicPattern = new RegExp("/topic/room/.+/gameState/team/.+");

  Object.keys(subscriptions).forEach((dst) => {
    if (teamTopicPattern.test(dst)) {
      unsubscribe(dst);
    }
  });
};

export const unsubscribeAll = () => {
  Object.keys(subscriptions).forEach(unsubscribe);
};
