import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { didSomeoneNotVote } from "../../global/utils";
import { publishGameStart } from "../api/apiRequest";

function useDashboard() {
  const { value: isLeftPanelShown, setTrue: showLeftPanel, setFalse: hideLeftPanel } = useBoolean();
  const { value: isRightPanelShown, setTrue: showRightPanel, setFalse: hideRightPanel } = useBoolean();
  const room = useSelector((state) => state.roomManager.room);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const notEveryoneVoted = useMemo(() => {
    return gameState.status === "VOTING" && didSomeoneNotVote(room.players, gameState.votesBlue, gameState.votesRed);
  }, [gameState.status, room.players, gameState.votesBlue, gameState.votesRed]);

  const startGame = () => {
    publishGameStart({ roomId: room.id });
  };

  return { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel, notEveryoneVoted, startGame };
}

export default useDashboard;
