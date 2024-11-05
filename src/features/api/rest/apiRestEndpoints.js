export const PLAYER_CREATE = "/player/{nickname}";

export const ROOM_CREATE = "/room";
export const ROOM_JOIN = "/room/{roomId}/player";
export const ROOM_LEAVE = "/room/{roomId}/player/{playerId}";
export const ROOM_RECONNECT = "/room/reconnect";

export const IMAGES_UPLOAD = "/room/{roomId}/images";
