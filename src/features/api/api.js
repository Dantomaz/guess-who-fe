// REST
export const API_URL = "http://localhost:8080";

export const API_INIT_PLAYER = API_URL + "/player/init/{playerName}";
export const API_CREATE_ROOM = API_URL + "/room/create";

// WEB SOCKET
export const API_SOCKET_URL = "ws://localhost:8080/ws";

export const API_QUEUE_ERROR = "/user/queue/error";

export const API_TOPIC_ROOM = "/topic/room/{roomId}";
export const API_TOPIC_ROOM_COUNTER = "/topic/room/counter/{roomId}";

export const API_JOIN_ROOM = "/app/room/join/{roomId}";
export const API_LEAVE_ROOM = "/app/room/leave/{roomId}";
export const API_ROOM_COUNTER = "/app/room/counter/{roomId}";
