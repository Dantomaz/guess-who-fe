import React from "react";
import { useSelector } from "react-redux";
import styles from "./Card.module.scss";

const Card = ({ number, image, voters, onVote, onClick, onContextMenu }) => {
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  const { onClick: handleClick, onContextMenu: handleContextMenu } =
    {
      VOTING: {
        onClick: (e) => {
          e.preventDefault();
          onVote(number);
        },
        onContextMenu: (e) => {
          e.preventDefault();
        },
      },
      IN_PROGRESS: {
        onClick: (e) => {
          e.preventDefault();
          onClick(number);
        },
        onContextMenu: (e) => {
          e.preventDefault();
          onContextMenu(number);
        },
      },
    }[gameState.status] || {};

  return (
    <div className={styles["card"]} onClick={handleClick} onContextMenu={handleContextMenu}>
      {number}
      {gameState.status === "VOTING" && voters?.map((player) => player.name)}
      <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} className={styles["image"]} />
    </div>
  );
};

export default Card;
