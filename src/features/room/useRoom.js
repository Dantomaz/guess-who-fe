import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishRoomCounter, requestRoomLeave } from "../api/apiRequest";
import { resetRoom } from "./roomSlice";

const useRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);
  const count = useSelector((state) => state.counter.count);
  const player = useSelector((state) => state.playerManager.player);
  const addAmount = 1;

  const onSend = () => {
    publishRoomCounter({ roomId: room.id, counter: addAmount });
  };

  const onLeave = () => {
    requestRoomLeave({ roomId: room.id, player })
      .then(() => {
        dispatch(resetRoom());
        navigate("/");
      })
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
