import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import { preventDefaultAction } from "../../../../global/utils";
import styles from "./PickedCard.module.scss";

const PickedCard = ({ show }) => {
  const images = useSelector((state) => state.roomManager.room.images);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const player = useSelector((state) => state.playerManager.player);
  const cardRef = useRef();

  const highlightStyle = player.team === "BLUE" ? "highlighted-blue" : "highlighted-red";

  const ANIMATION_DURATION_IN_SECONDS = 1;
  const ANIMATION_STYLE_FROM = {
    scale: 0,
    duration: ANIMATION_DURATION_IN_SECONDS,
    ease: "power1.in",
  };

  // Animate enter
  useGSAP(
    () => {
      if (show) {
        gsap.from(cardRef.current, ANIMATION_STYLE_FROM);
      }
    },
    { dependencies: [show] }
  );

  return (
    gameState.pickedCardNumber &&
    createPortal(
      <Transition nodeRef={cardRef} in={show} timeout={ANIMATION_DURATION_IN_SECONDS * 1000} mountOnEnter unmountOnExit>
        <div ref={cardRef} className={styles["card"]} onContextMenu={preventDefaultAction}>
          <div className={`${styles["card-title-container"]} ${styles[highlightStyle]}`}>
            <div className={styles["card-number"]}>{gameState.pickedCardNumber}</div>
          </div>
          <div className={styles["image-container"]}>
            <img
              src={images[gameState.pickedCardNumber - 1]}
              key={gameState.pickedCardNumber}
              alt={gameState.pickedCardNumber}
              draggable={false}
              className={styles["image"]}
            />
          </div>
        </div>
      </Transition>,
      document.body
    )
  );
};

export default PickedCard;
