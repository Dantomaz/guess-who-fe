import { insertVariables } from "../../global/utils";
import { IMAGES_UPLOAD, PLAYER_CREATE, PLAYER_JOIN_ROOM, PLAYER_LEAVE_ROOM, PLAYER_UPDATE, ROOM_CREATE } from "./rest/apiRestEndpoints";
import { axiosDelete, axiosPatch, axiosPost } from "./rest/axiosClient";
import {
  APP_GAME_PREPARE,
  APP_GAME_START,
  APP_VOTE_FOR_CARD,
  QUEUE_ERROR,
  TOPIC_GAME_STATE,
  TOPIC_IMAGES,
  TOPIC_PLAYERS,
} from "./web-socket/apiWsEndpoints";
import { publish, subscribe } from "./web-socket/stompClient";

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
export const subscribeTopicImages = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_IMAGES, roomId), callback);

export const subscribeTopicGameState = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_GAME_STATE, roomId), callback);

export const publishGamePrepare = ({ roomId }) => publish(insertVariables(APP_GAME_PREPARE, roomId));
export const publishVoteForCard = ({ roomId, playerId, cardNumber }) => publish(insertVariables(APP_VOTE_FOR_CARD, roomId), { playerId, cardNumber });

export const publishGameStart = ({ roomId }) => publish(insertVariables(APP_GAME_START, roomId));
