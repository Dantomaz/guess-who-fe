import React from "react";
import { useSelector } from "react-redux";
import { getGridTemplateColumnsEstimate } from "../../global/utils";
import styles from "./Board.module.scss";
import Card from "./card/Card";

const Board = () => {
  const images = useSelector((state) => state.roomManager.room.images);
  const cards = useSelector((state) => state.gameStateManager.gameState.cards);
  const team = useSelector((state) => state.playerManager.player.team);
  const cardsList = Object.values(cards);

  return (
    <div className={styles["container"]} style={getGridTemplateColumnsEstimate(cardsList.length)}>
      {cardsList.map((card) => (
        <Card number={card.number} image={images[card.number - 1]} closed={team === "RED" ? card.closedByRed : card.closedByBlue} key={card.number} />
      ))}
    </div>
  );
};

export default Board;
