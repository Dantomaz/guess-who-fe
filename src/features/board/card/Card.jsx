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

const Card = ({ number, imageUrl }) => {
  const {
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
  } = useCard({ number });
  const gameStatus = useSelector((state) => state.gameStateManager.gameState.gameStatus);
  const cardRef = useRef();
  const flipState = useRef();

  useLayoutEffect(() => {
    flipState.current = Flip.getState(cardRef.current);

    const deltaX = window.innerWidth / 2 - flipState.current.elementStates[0].bounds.left - flipState.current.elementStates[0].bounds.width / 2;
    const deltaY = -flipState.current.elementStates[0].bounds.bottom - 100;

    // offset the card to prepare for the animation
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
      <div ref={cardRef} className={styles["card"]} onClick={handleClick} onContextMenu={preventDefaultAction}>
        <div
          className={`${styles["card-shutter"]} ${isCardClosed ? styles["card-shutter-closed"] : styles["card-shutter-opened"]} ${
            isPeeking && styles["card-shutter-peek"]
          }`}
          onMouseDown={peek}
          onMouseUp={stopPeeking}
          onMouseLeave={stopPeeking}
        ></div>
        <div className={`${styles["card-title-container"]} ${styles[highlightStyle]}`}>
          <div className={styles["card-number"]}>{number}</div>
          {isPickIconVisible && <PickIcon onClick={guessCard} disable={isCardClosed} />}
        </div>
        <div className={styles["image-container"]} onContextMenu={showImagePreview}>
          {gameStatus === "VOTING" && <Voters voters={voters} />}
          <img src={imageUrl} key={number} alt={number} draggable={false} className={styles["image"]} />
        </div>
      </div>
      <ImageModal imageUrl={imageUrl} imageKey={number} onBackdropClick={hideImagePreview} show={isImagePreviewShown} baseFlipState={flipState} />
    </>
  );
};

export default Card;
