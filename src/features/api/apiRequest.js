import { insertVariables } from "../../global/utils";
import { IMAGES_UPLOAD, PLAYER_CREATE, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE, ROOM_RECONNECT } from "./rest/apiRestEndpoints";
import { axiosDelete, axiosPost } from "./rest/axiosClient";
import {
  APP_END_TURN,
  APP_GAME_PREPARE,
  APP_GAME_RESTART,
  APP_GUESS_CARD,
  APP_PLAYER_CHANGE_NAME,
  APP_PLAYER_CHANGE_TEAM,
  APP_PLAYER_KICK,
  APP_PLAYER_MAKE_HOST,
  APP_TEAMS_RANDOMIZE,
  APP_TEAMS_RESET,
  APP_TOGGLE_CARD,
  APP_VOTE_FOR_CARD,
  QUEUE_ERROR,
  TOPIC_DISCONNECT,
  TOPIC_GAME_STATE,
  TOPIC_IMAGES,
  TOPIC_PLAYERS,
} from "./web-socket/apiWsEndpoints";
import { publish, subscribe, unsubscribeTeams } from "./web-socket/stompClient";

// ===== headers ===== /

const imageHeaders = { headers: { "Content-Type": "multipart/form-data", Accept: "application/json" } };

// ===== error ===== /

export const subscribeQueueError = ({ callback }) => subscribe(QUEUE_ERROR, callback);

// ===== player ===== /

export const requestPlayerCreate = ({ nickname }) => axiosPost(insertVariables(PLAYER_CREATE, nickname));

export const subscribeTopicPlayers = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_PLAYERS, roomId), callback);

export const publishPlayerChangeName = ({ roomId, playerId, newName }) =>
  publish(insertVariables(APP_PLAYER_CHANGE_NAME, roomId, playerId), { payload: newName }); // every String has to be named 'payload' when sending over STOMP

export const publishPlayerChangeTeam = ({ roomId, playerId, newTeam }) => publish(insertVariables(APP_PLAYER_CHANGE_TEAM, roomId, playerId), newTeam);

export const publishPlayerMakeHost = ({ roomId, playerId }) => publish(insertVariables(APP_PLAYER_MAKE_HOST, roomId, playerId));

export const publishPlayerKick = ({ roomId, playerId }) => publish(insertVariables(APP_PLAYER_KICK, roomId, playerId));

export const publishTeamsReset = ({ roomId }) => publish(insertVariables(APP_TEAMS_RESET, roomId));

export const publishTeamsRandomize = ({ roomId }) => publish(insertVariables(APP_TEAMS_RANDOMIZE, roomId));

// ===== room ===== /

export const requestRoomCreate = ({ player }) => axiosPost(ROOM_CREATE, player);

export const requestRoomJoin = ({ roomId, player }) => axiosPost(insertVariables(ROOM_JOIN, roomId), player);

export const requestRoomLeave = ({ roomId, playerId }) => axiosDelete(insertVariables(ROOM_LEAVE, roomId, playerId));

export const requestRoomReconnect = ({ roomId, playerId }) => axiosPost(insertVariables(ROOM_RECONNECT, roomId, playerId));

// ===== images ===== /

export const requestImagesUpload = ({ roomId, formData }) => axiosPost(insertVariables(IMAGES_UPLOAD, roomId), formData, imageHeaders);

export const subscribeTopicImages = ({ roomId, callback }) => subscribe(insertVariables(TOPIC_IMAGES, roomId), callback);

// ===== gamestate ===== /

export const subscribeTopicGameState = ({ roomId, team, callback }) => subscribe(insertVariables(TOPIC_GAME_STATE, roomId, team), callback);

export const unsubscribeTopicTeams = () => unsubscribeTeams();

export const publishGameRestart = ({ roomId }) => publish(insertVariables(APP_GAME_RESTART, roomId));

export const publishGamePrepare = ({ roomId, useDefaultImages }) => publish(insertVariables(APP_GAME_PREPARE, roomId), useDefaultImages);

export const publishVoteForCard = ({ roomId, playerId, cardNumber }) => publish(insertVariables(APP_VOTE_FOR_CARD, roomId), { playerId, cardNumber });

export const publishEndTurn = ({ roomId, playerId }) => publish(insertVariables(APP_END_TURN, roomId, playerId));

export const publishToggleCard = ({ roomId, cardNumber, team }) => publish(insertVariables(APP_TOGGLE_CARD, roomId), { cardNumber, team });

export const publishGuessCard = ({ roomId, playerId, cardNumber }) => publish(insertVariables(APP_GUESS_CARD, roomId, playerId), cardNumber);

// ===== disconnect ===== /

export const subscribeTopicDisconnect = ({ roomId, playerId, callback }) => subscribe(insertVariables(TOPIC_DISCONNECT, roomId, playerId), callback);
