import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const useNotifier = () => {
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const textRef = useRef();
  const [oldText, setOldText] = useState("");

  let text = "";

  if (gameState.gameStatus === "NEW") {
    if (player.host) {
      text = "Settings";
    } else {
      text = "Wait for host";
    }
  } else if (gameState.gameStatus === "VOTING") {
    text = "Choose the card for your team";
  } else if (gameState.gameStatus === "IN_PROGRESS") {
    if (gameState.currentTurn === player.team) {
      text = "Ask a question or take a guess!";
    } else {
      text = "Answer your opponent's question";
    }
  } else if (gameState.gameStatus === "FINISHED") {
    if (gameState.winner === player.team) {
      text = "Your team won!";
    } else {
      text = "Your team lost!";
    }
  } else {
    text = " ";
  }

  useEffect(() => {
    setOldText(text);
  }, [text]);

  useGSAP(
    () => {
      if (text) {
        gsap
          .timeline()
          .to(textRef.current, {
            text: "",
            ease: "none",
            duration: `${oldText.length / 100}`,
          })
          .to(textRef.current, {
            text: text,
            ease: "none",
            duration: `${text.length / 50}`,
          });
      }
    },
    { dependencies: [text] }
  );

  return { textRef };
};

export default useNotifier;
