import { insertVariables } from "../../global/utils";
import { PLAYER_INIT, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE } from "./rest/apiRestEndpoints";
import { axiosGet, axiosPatch, axiosPost } from "./rest/axiosClient";
import { PUBLISH_PLAYER, PUBLISH_ROOM_COUNTER, QUEUE_ERROR, TOPIC_ROOM, TOPIC_ROOM_COUNTER } from "./web-socket/apiWsEndpoints";
import { publish, subscribe } from "./web-socket/stompClient";

export const requestPlayerInit = ({ nickname }) => axiosGet(insertVariables(PLAYER_INIT, nickname));

export const subscribeQueueError = ({ callback }) => subscribe(QUEUE_ERROR, callback);

export const requestRoomCreate = ({ player }) => axiosPost(ROOM_CREATE, player);
export const requestRoomJoin = ({ roomId, player }) => axiosPatch(insertVariables(ROOM_JOIN, roomId), player);
export const requestRoomLeave = ({ roomId, player }) => axiosPatch(insertVariables(ROOM_LEAVE, roomId), player);
export const subscribeTopicRoom = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_ROOM, roomId), callback);
export const subscribeTopicRoomCounter = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_ROOM_COUNTER, roomId), callback);
export const publishRoomCounter = ({ roomId, counter }) => publish(insertVariables(PUBLISH_ROOM_COUNTER, roomId), counter);
export const publishPlayer = ({ roomId, player }) => publish(insertVariables(PUBLISH_PLAYER, roomId, player.id), player);
