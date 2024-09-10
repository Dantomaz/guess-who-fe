import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { listVotersByCardNumbers, preventDefaultAction } from "../../../global/utils";
import { publishGuessCard, publishToggleCard, publishVoteForCard } from "../../api/apiRequest";

const useCard = ({ number }) => {
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const [voters, setVoters] = useState();
  const { value: isImagePreviewShown, setTrue: showImagePreview, setFalse: hideImagePreview } = useBoolean();

  useEffect(() => {
    const voters = player.team === "RED" ? gameState.votesRed : gameState.votesBlue;
    setVoters(listVotersByCardNumbers(room.players, voters).get(number));
  }, [gameState.votesBlue, gameState.votesRed, player.team, room.players, number]);

  const voteForCard = () => {
    publishVoteForCard({ roomId: room.id, playerId: player.id, cardNumber: number });
  };

  const card = gameState.cards[number - 1];
  const closed = player.team === "RED" ? card.closedByRed : card.closedByBlue;
  const showPickIcon = gameState.status === "IN_PROGRESS" && gameState.currentTurn === player.team;
  const isHighlightedBlue = gameState.status === "FINISHED" && number === gameState.cardNrChosenByBlue;
  const isHighlightedRed = gameState.status === "FINISHED" && number === gameState.cardNrChosenByRed;

  const guessCard = (e) => {
    preventDefaultAction(e);
    if (closed) {
      return;
    }
    publishGuessCard({ roomId: room.id, cardNumber: number });
  };

  const { onClick: handleClick } =
    {
      VOTING: {
        onClick: () => {
          voteForCard();
        },
      },
      IN_PROGRESS: {
        onClick: () => {
          publishToggleCard({ roomId: room.id, cardNumber: number, team: player.team });
        },
      },
    }[gameState.status] || {};

  return {
    closed,
    voters,
    handleClick,
    showPickIcon,
    guessCard,
    isHighlightedBlue,
    isHighlightedRed,
    isImagePreviewShown,
    showImagePreview,
    hideImagePreview,
  };
};

export default useCard;
