import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import React, { useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { preventDefaultAction } from "../../../global/utils";
import ImageModal from "../../image-modal/ImageModal";
import styles from "./Card.module.scss";
import PickIcon from "./PickIcon";
import useCard from "./useCard";
import Voters from "./Voters";

const Card = ({ number, image }) => {
  const {
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
  } = useCard({ number });
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const cardRef = useRef();
  const flipState = useRef();

  useLayoutEffect(() => {
    flipState.current = Flip.getState(cardRef.current);

    const deltaX = window.innerWidth / 2 - flipState.current.elementStates[0].bounds.left - flipState.current.elementStates[0].bounds.width / 2;
    const deltaY = -flipState.current.elementStates[0].bounds.bottom - 100;

    // offset the card before rendering to prepare for the animation
    gsap.set(cardRef.current, { transform: `translate(${deltaX}px, ${deltaY}px)` });
  }, []);

  useGSAP(() => {
    // animate the card movement
    Flip.to(flipState.current, {
      ease: "elastic.out(1, 0.75)",
      duration: 0.5,
      delay: 1 + Math.random() * 1.2,
      onComplete: () => {
        // Ensure the card becomes part of the normal layout after the animation
        gsap.set(cardRef.current, { clearProps: "all" });
      },
    });
  });

  return (
    <>
      <div
        ref={cardRef}
        className={`${styles["card"]} ${closed && styles["card-closed"]} ${
          styles[isHighlightedBlue ? "highlighted-blue" : isHighlightedRed ? "highlighted-red" : ""]
        }`}
        onClick={handleClick}
        onContextMenu={preventDefaultAction}
      >
        <div className={styles["card-title-container"]}>
          <div className={styles["card-number"]}>{number}</div>
          {showPickIcon && <PickIcon onClick={guessCard} />}
        </div>
        <div className={styles["image-container"]} onContextMenu={showImagePreview}>
          {gameState.status === "VOTING" && <Voters voters={voters} />}
          <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} draggable={false} className={styles["image"]} />
        </div>
      </div>
      {isImagePreviewShown && <ImageModal image={image} imageKey={number} onBackdropClick={hideImagePreview} />}
    </>
  );
};

export default Card;
