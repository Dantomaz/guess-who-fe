import React from "react";
import { useSelector } from "react-redux";
import { getGridTemplateColumnsNumber } from "../../global/utils";
import styles from "./Board.module.scss";
import Card from "./card/Card";

const Board = () => {
  const images = useSelector((state) => state.roomManager.room.images);
  const cards = useSelector((state) => state.gameStateManager.gameState.cards);

  return (
    <div className={styles["container"]} style={getGridTemplateColumnsNumber(cards?.length)}>
      {cards && cards.map((card) => <Card number={card.number} imageUrl={images[card.number - 1]} key={card.number} />)}
    </div>
  );
};

export default Board;
