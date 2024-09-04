export const BASE_URL = "ws://localhost:8080/ws";

// ===== subscribe endpoints =====

export const QUEUE_ERROR = "/user/queue/error";

export const TOPIC_PLAYERS = "/topic/room/{roomId}/players";

export const TOPIC_IMAGES = "/topic/room/{roomId}/images";

export const TOPIC_GAME_STATE = "/topic/room/{roomId}/gameState";

// ===== publish endpoints =====

export const APP_GAME_PREPARE = "/app/room/{roomId}/prepareGame";
