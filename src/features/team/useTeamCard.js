import { useSelector } from "react-redux";
import { countVoters } from "../../global/utils";
import { publishEndTurn, publishGameStart, publishPlayerChangeTeam } from "../api/apiRequest";

const useTeamCard = ({ team }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const players = Object.values(room.players);
  const playersInTeam = players.filter((player) => player.team === team);
  const numberOfVoters = countVoters(room.players, gameState.votesBlue, gameState.votesRed);
  const numberOfAllPlayers = players.length;
  const notEveryoneVoted = numberOfVoters < numberOfAllPlayers;
  const displayEndVotingButton = gameState.status === "VOTING" && player.team === team && player.host;
  const displayEndTurnButton = gameState.status === "IN_PROGRESS" && player.team === team && gameState.currentTurn === player.team;
  const displaySwitchTeamButton = gameState.status === "NEW" && player.team !== team;

  const startGame = () => {
    publishGameStart({ roomId: room.id });
  };

  const endTurn = () => {
    publishEndTurn({ roomId: room.id });
  };

  const switchTeam = () => {
    publishPlayerChangeTeam({ roomId: room.id, playerId: player.id, newTeam: team });
  };

  return {
    playersInTeam,
    numberOfVoters,
    numberOfAllPlayers,
    displayEndVotingButton,
    notEveryoneVoted,
    startGame,
    displayEndTurnButton,
    endTurn,
    displaySwitchTeamButton,
    switchTeam,
  };
};

export default useTeamCard;
