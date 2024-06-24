import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_LEAVE_ROOM, API_ROOM_COUNTER } from "../api/api";
import { useWebSocketClientContext } from "../api/web-socket/WebSocketClientProvider";

const useRoom = () => {
  const navigate = useNavigate();
  const room = useSelector((state) => state.roomManager.room);
  const count = useSelector((state) => state.counter.count);
  const player = useSelector((state) => state.playerManager.player);
  const { publish } = useWebSocketClientContext();
  const addAmount = 1;

  const onSend = () => {
    publish(API_ROOM_COUNTER.replace("{roomId}", room.id), addAmount).catch(() => {});
  };

  const onLeave = () => {
    publish(API_LEAVE_ROOM.replace("{roomId}", room.id), player)
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return {
    onSend,
    onLeave,
    room,
    count,
    addAmount,
  };
};

export default useRoom;
