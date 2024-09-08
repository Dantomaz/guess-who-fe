import { useMemo } from "react";
import { useSelector } from "react-redux";
import { publishPlayerChangeTeam } from "../api/apiRequest";

const useTeam = () => {
  const room = useSelector((state) => state.roomManager.room);
  const playerId = useSelector((state) => state.playerManager.player.id);

  const teams = useMemo(() => {
    const playersDividedByTeam = {
      RED: [],
      BLUE: [],
      SPECTATORS: [],
    };

    Object.values(room.players).forEach((player) => playersDividedByTeam[player.team].push(player));
    return playersDividedByTeam;
  }, [room.players]);

  const onTeamSelect = (value) => {
    publishPlayerChangeTeam({ roomId: room.id, playerId, newTeam: value.toUpperCase() });
  };

  return { onTeamSelect, teams };
};

export default useTeam;
