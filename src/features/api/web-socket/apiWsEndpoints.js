export const BASE_URL = "ws://localhost:8080/ws";

// ===== subscribe endpoints =====

export const QUEUE_ERROR = "/user/queue/error";

export const TOPIC_PLAYERS = "/topic/room/{roomId}/players";

export const TOPIC_IMAGES = "/topic/room/{roomId}/images";

export const TOPIC_GAME_STATE = "/topic/room/{roomId}/gameState";

// ===== publish endpoints =====

export const APP_PLAYER_CHANGE_NAME = "/app/room/{roomId}/player/{playerId}/changeName";
export const APP_PLAYER_CHANGE_TEAM = "/app/room/{roomId}/player/{playerId}/changeTeam";

export const APP_GAME_RESTART = "/app/room/{roomId}/restartGame";

export const APP_GAME_PREPARE = "/app/room/{roomId}/prepareGame";
export const APP_VOTE_FOR_CARD = "/app/room/{roomId}/vote";

export const APP_GAME_START = "/app/room/{roomId}/startGame";
export const APP_TOGGLE_CARD = "/app/room/{roomId}/toggleCard";
