import { useSelector } from "react-redux";

const useNotifier = () => {
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  let text = "";

  if (gameState.status === "NEW") {
    if (player.host) {
      text = "Settings";
    } else {
      text = "Wait for host";
    }
  } else if (gameState.status === "VOTING") {
    text = "Choose the card for your team";
  } else if (gameState.status === "IN_PROGRESS") {
    if (gameState.currentTurn === player.team) {
      text = "Ask a question or take a guess!";
    } else {
      text = "Answer your opponent's question";
    }
  } else if (gameState.status === "FINISHED") {
    if (gameState.winner === player.team) {
      text = "Your team won!";
    } else {
      text = "Your team lost!";
    }
  } else {
    text = "Happy bug day!"; // this should never be displayed
  }

  return { text };
};

export default useNotifier;
