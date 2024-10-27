import { useSelector } from "react-redux";
import { publishEndTurn, publishGameStart } from "../api/apiRequest";

const useTeamCard = ({ team }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const players = Object.values(room.players);
  const playersInTeam = players.filter((player) => player.team === team);
  const numberOfVoters = gameState.totalNumberOfPlayersVotes;
  const numberOfAllPlayers = players.length;
  const notEveryoneVoted = numberOfVoters < numberOfAllPlayers;
  const displayEndVotingButton = gameState.gameStatus === "VOTING" && player.team === team && player.host;
  const displayEndTurnButton = gameState.gameStatus === "IN_PROGRESS" && player.team === team && gameState.currentTurn === player.team;
  const displaySwitchTeamButton = gameState.gameStatus === "NEW" && player.team !== team;

  const startGame = () => {
    publishGameStart({ roomId: room.id });
  };

  const endTurn = () => {
    publishEndTurn({ roomId: room.id });
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
  };
};

export default useTeamCard;
