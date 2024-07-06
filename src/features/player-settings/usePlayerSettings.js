import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publishPlayer, requestRoomLeave } from "../api/apiRequest";
import { resetRoom } from "../room/roomSlice";

function usePlayerSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const changeNickname = (data) => {
    const updated = { ...player, name: data.nickname.trim() };
    publishPlayer({ roomId: room.id, player: updated });
  };

  const onLeave = () => {
    requestRoomLeave({ roomId: room.id, player })
      .then(() => {
        dispatch(resetRoom());
        navigate("/");
      })
      .catch(() => {});
  };

  return { changeNickname, onLeave };
}

export default usePlayerSettings;
