import React from "react";
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

  return (
    <>
      <div
        className={`${styles["card"]} ${closed && styles["card-closed"]} ${
          styles[isHighlightedBlue ? "highlighted-blue" : isHighlightedRed ? "highlighted-red" : ""]
        }`}
        onClick={handleClick}
        onContextMenu={preventDefaultAction}
      >
        <div className={styles["card-title-container"]}>
          <div className={styles["card-number"]}>{number}</div>
          {showPickIcon && <PickIcon active={!closed} onClick={guessCard} />}
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
