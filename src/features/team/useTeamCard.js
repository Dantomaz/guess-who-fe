import { useMemo } from "react";
import { useSelector } from "react-redux";
import { publishPlayerChangeTeam } from "../api/apiRequest";

const useTeamCard = ({ team }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const teams = useMemo(() => {
    const playersDividedByTeam = {
      RED: [],
      BLUE: [],
      SPECTATORS: [],
    };

    Object.values(room.players).forEach((player) => playersDividedByTeam[player.team].push(player));
    return playersDividedByTeam;
  }, [room.players]);

  const displaySwitchTeamButton = gameState.status === "NEW" && player.team !== team;

  const switchTeam = () => {
    publishPlayerChangeTeam({ roomId: room.id, playerId: player.id, newTeam: team });
  };

  return { teams, displaySwitchTeamButton, switchTeam };
};

export default useTeamCard;
