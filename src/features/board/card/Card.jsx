import React from "react";
import { useSelector } from "react-redux";
import styles from "./Card.module.scss";
import PickIcon from "./PickIcon";
import useCard from "./useCard";
import Voters from "./Voters";

const Card = ({ number, image, closed }) => {
  const { voters, handleClick, handleContextMenu, showPickIcon, guessCard, isHighlightedBlue, isHighlightedRed } = useCard({ number, closed });
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  return (
    <div
      className={`${styles["card"]} ${closed && styles["card-closed"]} ${
        styles[isHighlightedBlue ? "highlighted-blue" : isHighlightedRed ? "highlighted-red" : ""]
      }`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className={styles["card-title-container"]}>
        <div className={styles["card-number"]}>{number}</div>
        {showPickIcon && <PickIcon active={!closed} onClick={guessCard} />}
      </div>
      <div className={styles["image-container"]}>
        {gameState.status === "VOTING" && <Voters voters={voters} />}
        <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} draggable={false} className={styles["image"]} />
      </div>
    </div>
  );
};

export default Card;
