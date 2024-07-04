import { useSelector } from "react-redux";
import { publishPlayer } from "../api/apiRequest";

function usePlayerSettings() {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const changeNickname = (data) => {
    const updated = { ...player, name: data.nickname };
    publishPlayer({ roomId: room.id, player: updated });
  };

  return { changeNickname };
}

export default usePlayerSettings;
