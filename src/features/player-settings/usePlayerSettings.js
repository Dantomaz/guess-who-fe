import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createJsonPatch } from "../../global/utils";
import { requestPlayerLeaveRoom, requestPlayerUpdate } from "../api/apiRequest";
import { resetRoom } from "../room/roomSlice";

function usePlayerSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const changeNickname = (data) => {
    const playerPatch = createJsonPatch(["replace", "/name", data.nickname.trim()]);
    requestPlayerUpdate({ roomId: room.id, playerId: player.id, playerPatch }).catch(() => {});
  };

  const onLeave = () => {
    requestPlayerLeaveRoom({ roomId: room.id, playerId: player.id })
      .then(() => {
        dispatch(resetRoom());
        navigate("/");
      })
      .catch(() => {});
  };

  return { changeNickname, onLeave };
}

export default usePlayerSettings;
