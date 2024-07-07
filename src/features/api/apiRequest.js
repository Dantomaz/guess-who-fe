import { insertVariables } from "../../global/utils";
import { PLAYER_CREATE, PLAYER_JOIN_ROOM, PLAYER_LEAVE_ROOM, PLAYER_UPDATE, ROOM_CREATE, ROOM_UPDATE } from "./rest/apiRestEndpoints";
import { axiosDelete, axiosPatch, axiosPost } from "./rest/axiosClient";
import { PUBLISH_ROOM_COUNTER, QUEUE_ERROR, TOPIC_ROOM, TOPIC_ROOM_COUNTER } from "./web-socket/apiWsEndpoints";
import { publish, subscribe } from "./web-socket/stompClient";

export const requestPlayerCreate = ({ nickname }) => axiosPost(insertVariables(PLAYER_CREATE, nickname));
export const requestPlayerUpdate = ({ roomId, playerId, playerPatch: jsonPatch }) =>
  axiosPatch(insertVariables(PLAYER_UPDATE, roomId, playerId), jsonPatch);
export const requestPlayerJoinRoom = ({ roomId, player }) => axiosPost(insertVariables(PLAYER_JOIN_ROOM, roomId), player);
export const requestPlayerLeaveRoom = ({ roomId, playerId }) => axiosDelete(insertVariables(PLAYER_LEAVE_ROOM, roomId, playerId));

export const subscribeQueueError = ({ callback }) => subscribe(QUEUE_ERROR, callback);

export const requestRoomCreate = ({ player }) => axiosPost(ROOM_CREATE, player);
export const requestRoomUpdate = ({ roomId, roomPatch: jsonPatch }) => axiosPatch(insertVariables(ROOM_UPDATE, roomId), jsonPatch);
export const subscribeTopicRoom = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_ROOM, roomId), callback);
export const subscribeTopicRoomCounter = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_ROOM_COUNTER, roomId), callback);

export const publishRoomCounter = ({ roomId, counter }) => publish(insertVariables(PUBLISH_ROOM_COUNTER, roomId), counter);
