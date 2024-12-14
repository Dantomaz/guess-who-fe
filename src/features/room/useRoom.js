import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hintsContextFinished, hintsContextInProgress, hintsContextNew, hintsContextVoting } from "../hints/hintsSlice";
import variables from "./../../global/styles/variables.scss";

const useRoom = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const host = useSelector((state) => state.playerManager.player?.host);

  const displaySettings = gameState.gameStatus === "NEW" && host;
  const displayBoard = gameState.gameStatus !== "NEW";
  const displayChosenCard = !!gameState.pickedCardNumber;

  useEffect(() => {
    const getBackground = () => {
      switch (gameState.currentTurn) {
        case "RED":
          return variables["background-red"];
        case "BLUE":
          return variables["background-blue"];
        default:
          return variables["background-default"];
      }
    };

    document.body.style.background = getBackground();
  }, [gameState.gameStatus, gameState.currentTurn]);

  const resolveHintsContext = () => {
    switch (gameState.gameStatus) {
      case "NEW":
        dispatch(hintsContextNew());
        break;
      case "VOTING":
        dispatch(hintsContextVoting());
        break;
      case "IN_PROGRESS":
        dispatch(hintsContextInProgress());
        break;
      case "FINISHED":
        dispatch(hintsContextFinished());
        break;
      default:
        dispatch(hintsContextNew());
        break;
    }
  };

  return { gameStatus: gameState.status, displaySettings, displayBoard, displayChosenCard, resolveHintsContext };
};

export default useRoom;
