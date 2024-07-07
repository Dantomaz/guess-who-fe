export const BASE_URL = "http://localhost:8080";

export const PLAYER_CREATE = "/player/{nickname}";
export const PLAYER_UPDATE = "/room/{roomId}/player/{playerId}";
export const PLAYER_JOIN_ROOM = "/room/{roomId}/player";
export const PLAYER_LEAVE_ROOM = "/room/{roomId}/player/{playerId}";

export const ROOM_CREATE = "/room";
export const ROOM_UPDATE = "/room/{roomId}";
