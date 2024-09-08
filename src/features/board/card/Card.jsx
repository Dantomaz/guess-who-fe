import React from "react";
import { useSelector } from "react-redux";
import styles from "./Card.module.scss";
import useCard from "./useCard";

const Card = ({ number, image, closed }) => {
  const { voters, handleClick, handleContextMenu } = useCard({ number });
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  return (
    <div className={`${styles["card"]} ${closed && styles["card-closed"]}`} onClick={handleClick} onContextMenu={handleContextMenu}>
      <div className={styles["card-number"]}>{number}</div>
      <div className={styles["image-container"]}>
        <div className={styles["voters"]}>
          {gameState.status === "VOTING" &&
            voters?.map((player) => <div className={`${styles["voter"]} ${styles[player.team.toLowerCase()]}`}>{player.name}</div>)}
        </div>
        <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} draggable={false} className={styles["image"]} />
      </div>
    </div>
  );
};

export default Card;
