import { insertVariables } from "../../global/utils";
import { IMAGES_UPLOAD, PLAYER_CREATE, PLAYER_JOIN_ROOM, PLAYER_LEAVE_ROOM, ROOM_CREATE } from "./rest/apiRestEndpoints";
import { axiosDelete, axiosPost } from "./rest/axiosClient";
import {
  APP_END_TURN,
  APP_GAME_PREPARE,
  APP_GAME_RESTART,
  APP_GAME_START,
  APP_GUESS_CARD,
  APP_PLAYER_CHANGE_NAME,
  APP_PLAYER_CHANGE_TEAM,
  APP_TOGGLE_CARD,
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
export const requestPlayerJoinRoom = ({ roomId, player }) => axiosPost(insertVariables(PLAYER_JOIN_ROOM, roomId), player);
export const requestPlayerLeaveRoom = ({ roomId, playerId }) => axiosDelete(insertVariables(PLAYER_LEAVE_ROOM, roomId, playerId));
export const subscribeTopicPlayers = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_PLAYERS, roomId), callback);
export const publishPlayerChangeName = ({ roomId, playerId, newName }) =>
  publish(insertVariables(APP_PLAYER_CHANGE_NAME, roomId, playerId), { newName });
export const publishPlayerChangeTeam = ({ roomId, playerId, newTeam }) => publish(insertVariables(APP_PLAYER_CHANGE_TEAM, roomId, playerId), newTeam);

export const requestRoomCreate = ({ player }) => axiosPost(ROOM_CREATE, player);

export const requestImageUpload = ({ roomId, formData }) => axiosPost(insertVariables(IMAGES_UPLOAD, roomId), formData, imageHeaders);
export const subscribeTopicImages = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_IMAGES, roomId), callback);

export const subscribeTopicGameState = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_GAME_STATE, roomId), callback);

export const publishGameRestart = ({ roomId }) => publish(insertVariables(APP_GAME_RESTART, roomId));

export const publishGamePrepare = ({ roomId }) => publish(insertVariables(APP_GAME_PREPARE, roomId));
export const publishVoteForCard = ({ roomId, playerId, cardNumber }) => publish(insertVariables(APP_VOTE_FOR_CARD, roomId), { playerId, cardNumber });

export const publishGameStart = ({ roomId }) => publish(insertVariables(APP_GAME_START, roomId));
export const publishEndTurn = ({ roomId }) => publish(insertVariables(APP_END_TURN, roomId));
export const publishToggleCard = ({ roomId, cardNumber, team }) => publish(insertVariables(APP_TOGGLE_CARD, roomId), { cardNumber, team });
export const publishGuessCard = ({ roomId, cardNumber }) => publish(insertVariables(APP_GUESS_CARD, roomId), cardNumber);
