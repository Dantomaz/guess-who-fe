import { useMemo } from "react";
import { useSelector } from "react-redux";
import { publishEndTurn, publishPlayerChangeTeam } from "../api/apiRequest";

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

  const displayEndTurnButton = gameState.status === "IN_PROGRESS" && player.team === team && gameState.currentTurn === player.team;
  const displaySwitchTeamButton = gameState.status === "NEW" && player.team !== team;

  const endTurn = () => {
    publishEndTurn({ roomId: room.id });
  };

  const switchTeam = () => {
    publishPlayerChangeTeam({ roomId: room.id, playerId: player.id, newTeam: team });
  };

  return { teams, displayEndTurnButton, endTurn, displaySwitchTeamButton, switchTeam };
};

export default useTeamCard;
