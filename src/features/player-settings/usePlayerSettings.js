import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishPlayerChangeName, requestRoomLeave } from "../api/apiRequest";
import { unsubscribeAll } from "../api/web-socket/stompClient";
import { resetPlayer } from "../player/playerSlice";
import { resetRoom } from "../room/roomSlice";

function usePlayerSettings({ hidePanel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const changeNickname = (data) => {
    publishPlayerChangeName({ roomId: room.id, playerId: player.id, newName: data.nickname.trim() });
    hidePanel();
  };

  const onLeave = () => {
    requestRoomLeave({ roomId: room.id, playerId: player.id })
      .then(() => leaveRoom())
      .catch((error) => console.error(error));
  };

  const leaveRoom = () => {
    unsubscribeAll();
    dispatch(resetRoom());
    dispatch(resetPlayer());
    navigate("/");
  };

  return { changeNickname, onLeave };
}

export default usePlayerSettings;
