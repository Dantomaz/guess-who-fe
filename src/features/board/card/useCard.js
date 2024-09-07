import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listVotersByCardNumbers } from "../../../global/utils";
import { publishToggleCard, publishVoteForCard } from "../../api/apiRequest";

const useCard = ({ number }) => {
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

  return { voters, handleClick, handleContextMenu };
};

export default useCard;
