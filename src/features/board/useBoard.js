import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listVotersByCardNumbers } from "../../global/utils";
import { publishVoteForCard } from "../api/apiRequest";

const useBoard = () => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const [voters, setVoters] = useState();

  useEffect(() => {
    const voters = player.team === "RED" ? gameState.votesRed : gameState.votesBlue;
    setVoters(listVotersByCardNumbers(room.players, voters));
  }, [gameState.votesBlue, gameState.votesRed, player.team, room.players]);

  const voteForCard = (cardNr) => {
    publishVoteForCard({ roomId: room.id, playerId: player.id, cardNumber: cardNr });
  };

  return { voters, voteForCard };
};

export default useBoard;
