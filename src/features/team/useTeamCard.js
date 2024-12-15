import { useSelector } from "react-redux";
import { publishEndTurn } from "../api/apiRequest";

const useTeamCard = ({ team }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const players = Object.values(room.players);
  const playersInTeam = players.filter((player) => player.team === team);
  const displayEndTurnButton = gameState.gameStatus === "IN_PROGRESS" && player.team === team && gameState.currentTurn === player.team;
  const displaySwitchTeamButton = gameState.gameStatus === "NEW" && player.team !== team;

  const endTurn = () => {
    publishEndTurn({ roomId: room.id, playerId: player.id });
  };

  return {
    playersInTeam,
    displayEndTurnButton,
    endTurn,
    displaySwitchTeamButton,
  };
};

export default useTeamCard;
