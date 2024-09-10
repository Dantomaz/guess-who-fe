import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listVotersByCardNumbers } from "../../../global/utils";
import { publishGuessCard, publishToggleCard, publishVoteForCard } from "../../api/apiRequest";

const useCard = ({ number, closed }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const [voters, setVoters] = useState();

  useEffect(() => {
    const voters = player.team === "RED" ? gameState.votesRed : gameState.votesBlue;
    setVoters(listVotersByCardNumbers(room.players, voters).get(number));
  }, [gameState.votesBlue, gameState.votesRed, player.team, room.players, number]);

  const voteForCard = () => {
    publishVoteForCard({ roomId: room.id, playerId: player.id, cardNumber: number });
  };

  const showPickIcon = gameState.status === "IN_PROGRESS" && gameState.currentTurn === player.team;
  const isHighlightedBlue = gameState.status === "FINISHED" && number === gameState.cardNrChosenByBlue;
  const isHighlightedRed = gameState.status === "FINISHED" && number === gameState.cardNrChosenByRed;

  const guessCard = (e) => {
    e.stopPropagation();
    if (closed) {
      return;
    }
    publishGuessCard({ roomId: room.id, cardNumber: number });
  };

  const { onClick: handleClick, onContextMenu: handleContextMenu } =
    {
      VOTING: {
        onClick: (e) => {
          e.preventDefault();
          voteForCard();
        },
        onContextMenu: (e) => {
          e.preventDefault();
        },
      },
      IN_PROGRESS: {
        onClick: (e) => {
          e.preventDefault();
          publishToggleCard({ roomId: room.id, cardNumber: number, team: player.team });
        },
        onContextMenu: (e) => {
          e.preventDefault();
          // onContextMenu(number);
        },
      },
    }[gameState.status] || {};

  return { voters, handleClick, handleContextMenu, showPickIcon, guessCard, isHighlightedBlue, isHighlightedRed };
};

export default useCard;
