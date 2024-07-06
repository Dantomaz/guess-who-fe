import { useSelector } from "react-redux";
import { publishRoomCounter } from "../api/apiRequest";

const useRoom = () => {
  const room = useSelector((state) => state.roomManager.room);
  const count = useSelector((state) => state.counter.count);
  const addAmount = 1;

  const onSend = () => {
    publishRoomCounter({ roomId: room.id, counter: addAmount });
  };

  return {
    onSend,
    room,
    count,
    addAmount,
  };
};

export default useRoom;
