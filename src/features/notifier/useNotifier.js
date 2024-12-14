import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useNotifier = () => {
  const { t } = useTranslation();
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const textRef = useRef();
  const [oldText, setOldText] = useState("");

  let text = "";

  if (gameState.gameStatus === "NEW") {
    if (player.host) {
      text = t("notifier.settings");
    } else {
      text = t("notifier.wait");
    }
  } else if (gameState.gameStatus === "VOTING") {
    text = t("notifier.choose-card");
  } else if (gameState.gameStatus === "IN_PROGRESS") {
    if (gameState.currentTurn === player.team) {
      text = t("notifier.ask-or-guess");
    } else {
      text = t("notifier.answer");
    }
  } else if (gameState.gameStatus === "FINISHED") {
    if (gameState.winner === player.team) {
      text = t("notifier.win");
    } else {
      text = t("notifier.loose");
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
