import React from "react";
import { useSelector } from "react-redux";
import styles from "./Card.module.scss";
import useCard from "./useCard";

const Card = ({ number, image, closed }) => {
  const { voters, handleClick, handleContextMenu } = useCard({ number });
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  return (
    <div className={`${styles["card"]} ${closed && styles["card-closed"]}`} onClick={handleClick} onContextMenu={handleContextMenu}>
      {number}
      {gameState.status === "VOTING" && voters?.map((player) => player.name)}
      <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} draggable={false} className={styles["image"]} />
    </div>
  );
};

export default Card;
