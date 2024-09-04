import { insertVariables } from "../../global/utils";
import { IMAGES_UPLOAD, PLAYER_CREATE, PLAYER_JOIN_ROOM, PLAYER_LEAVE_ROOM, PLAYER_UPDATE, ROOM_CREATE } from "./rest/apiRestEndpoints";
import { axiosDelete, axiosGet, axiosPatch, axiosPost } from "./rest/axiosClient";
import { QUEUE_ERROR, TOPIC_PLAYERS } from "./web-socket/apiWsEndpoints";
import { subscribe } from "./web-socket/stompClient";

const imageHeaders = { headers: { "Content-Type": "multipart/form-data", Accept: "application/json" } };

export const subscribeQueueError = ({ callback }) => subscribe(QUEUE_ERROR, callback);

export const requestPlayerCreate = ({ nickname }) => axiosPost(insertVariables(PLAYER_CREATE, nickname));
export const requestPlayerUpdate = ({ roomId, playerId, playerPatch: jsonPatch }) =>
  axiosPatch(insertVariables(PLAYER_UPDATE, roomId, playerId), jsonPatch);
export const requestPlayerJoinRoom = ({ roomId, player }) => axiosPost(insertVariables(PLAYER_JOIN_ROOM, roomId), player);
export const requestPlayerLeaveRoom = ({ roomId, playerId }) => axiosDelete(insertVariables(PLAYER_LEAVE_ROOM, roomId, playerId));
export const subscribeTopicPlayers = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_PLAYERS, roomId), callback);

export const requestRoomCreate = ({ player }) => axiosPost(ROOM_CREATE, player);

export const requestImageUpload = ({ roomId, formData }) => axiosPost(insertVariables(IMAGES_UPLOAD, roomId), formData, imageHeaders);
export const requestImageDownload = ({ roomId }) => axiosGet(insertVariables(IMAGES_UPLOAD, roomId));
