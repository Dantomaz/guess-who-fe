import { useSelector } from "react-redux";
import { publishPlayerChangeTeam } from "../../api/apiRequest";

const useTeamSelect = () => {
  const roomId = useSelector((state) => state.roomManager.room.id);
  const playerId = useSelector((state) => state.playerManager.player.id);

  const onTeamSelect = (value) => {
    publishPlayerChangeTeam({ roomId, playerId, newTeam: value });
  };

  return { onTeamSelect };
};

export default useTeamSelect;
