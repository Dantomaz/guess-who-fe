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
  const { value: isPeeking, setTrue: startPeeking, setFalse: stopPeeking } = useBoolean();

  useEffect(() => {
    const voters = gameState.playersVotes;
    setVoters(listVotersByCardNumbers(room.players, voters).get(number));
  }, [gameState.playersVotes, room.players, number]);

  const voteForCard = () => {
    publishVoteForCard({ roomId: room.id, playerId: player.id, cardNumber: number });
  };

  const isCardHighlighted = (team) => {
    const cardPickedMatchesTeam = player.team === team ? number === gameState.pickedCardNumber : number === gameState.pickedOpponentsCardNumber;
    return gameState.gameStatus === "FINISHED" && cardPickedMatchesTeam;
  };

  const card = gameState.cards[number - 1];
  const isCardClosed = card.closedLocked || card.closed;
  const isPickIconVisible = gameState.gameStatus === "IN_PROGRESS" && gameState.currentTurn === player.team;
  const isHighlightedBlue = isCardHighlighted("BLUE");
  const isHighlightedRed = isCardHighlighted("RED");
  const isHighlightedBoth = isHighlightedBlue && isHighlightedRed;
  const highlightStyle = isHighlightedBoth ? "highlighted-both" : isHighlightedBlue ? "highlighted-blue" : isHighlightedRed ? "highlighted-red" : "";

  const peek = (event) => {
    if (event.button === 2) {
      startPeeking();
    }
  };

  const guessCard = (e) => {
    preventDefaultAction(e);
    if (isCardClosed) {
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
          if (!card.closedLocked) {
            publishToggleCard({ roomId: room.id, cardNumber: number, team: player.team });
          }
        },
      },
    }[gameState.gameStatus] || {};

  return {
    isCardClosed,
    voters,
    handleClick,
    isPickIconVisible,
    guessCard,
    highlightStyle,
    isImagePreviewShown,
    showImagePreview,
    hideImagePreview,
    isPeeking,
    peek,
    stopPeeking,
  };
};

export default useCard;
