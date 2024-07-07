export const BASE_URL = "ws://localhost:8080/ws";

// ===== subscribe endopoints =====

export const QUEUE_ERROR = "/user/queue/error";

export const TOPIC_ROOM = "/topic/room/{id}";
export const TOPIC_ROOM_COUNTER = "/topic/room/{id}/counter";

// ===== publish endopoints =====

export const PUBLISH_ROOM_COUNTER = "/app/room/{id}/counter";
