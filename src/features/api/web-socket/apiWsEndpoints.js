// ===== subscribe endpoints =====

export const QUEUE_ERROR = "/user/queue/error";

export const TOPIC_PLAYERS = "/topic/room/{roomId}/players";

export const TOPIC_IMAGES = "/topic/room/{roomId}/images";

export const TOPIC_GAME_STATE = "/topic/room/{roomId}/gameState/team/{team}";

export const TOPIC_DISCONNECT = "/topic/room/{roomId}/player/{playerId}/disconnect";

// ===== publish endpoints =====

export const APP_PLAYER_CHANGE_NAME = "/app/room/{roomId}/player/{playerId}/changeName";
export const APP_PLAYER_CHANGE_TEAM = "/app/room/{roomId}/player/{playerId}/changeTeam";
export const APP_PLAYER_MAKE_HOST = "/app/room/{roomId}/player/{playerId}/makeHost";
export const APP_PLAYER_KICK = "/app/room/{roomId}/player/{playerId}/kick";

export const APP_GAME_RESTART = "/app/room/{roomId}/restartGame";

export const APP_GAME_PREPARE = "/app/room/{roomId}/prepareGame";
export const APP_VOTE_FOR_CARD = "/app/room/{roomId}/vote";

export const APP_GAME_START = "/app/room/{roomId}/startGame";
export const APP_END_TURN = "/app/room/{roomId}/endTurn";
export const APP_TOGGLE_CARD = "/app/room/{roomId}/toggleCard";
export const APP_GUESS_CARD = "/app/room/{roomId}/guessCard";
