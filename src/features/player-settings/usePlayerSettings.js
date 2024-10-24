import { useSelector } from "react-redux";
import { publishPlayerChangeName, requestRoomLeave } from "../api/apiRequest";
import useStateUpdateHandler from "../state/useStateUpdateHandler";

function usePlayerSettings({ hidePanel }) {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const { leaveRoom } = useStateUpdateHandler();

  const changeNickname = (data) => {
    publishPlayerChangeName({ roomId: room.id, playerId: player.id, newName: data.nickname.trim() });
    hidePanel();
  };

  const onLeave = () => {
    requestRoomLeave({ roomId: room.id, playerId: player.id }).then(leaveRoom).catch(console.error);
  };

  return { changeNickname, onLeave };
}

export default usePlayerSettings;
