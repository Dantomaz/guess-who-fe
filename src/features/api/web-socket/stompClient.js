import { Client } from "@stomp/stompjs";
import { parsePossibleJSONFromString } from "../../../global/utils";
import { subscribeQueueError } from "../apiRequest";
import { BASE_URL } from "./apiWsEndpoints";

const subscriptions = [];
const subscriptionsToRetry = [];

const onConnect = () => {
  console.log("connected: ", client.connected);
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
  console.log("connected: ", client.connected);
};

const client = new Client({
  brokerURL: BASE_URL,
  onConnect: onConnect,
  onWebSocketError: onWebSocketError,
  onStompError: onStompError,
  onWebSocketClose: onWebSocketClose,
});

client.activate();

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
    console.error(`Cannot subscribe to ${destination} - no connection established. Connecting...`);
    subscriptionsToRetry.push({ destination, callback });
    return;
  }

  const newSubscription = client.subscribe(destination, (frame) => {
    callback(parsePossibleJSONFromString(frame.body));
  });

  subscriptions.push(newSubscription);
};

export const publish = (destination, body) => {
  if (!client.connected) {
    console.error(`Cannot publish to ${destination} - no connection established. Connecting...`);
    return;
  }

  client.publish({ destination, body: JSON.stringify(body) });
};

export const unsubscribeAll = () => {
  subscriptions.forEach((subscription) => subscription.unsubscribe());
  subscriptions.length = 0; // clear the subscriptions array
};
