import React from "react";
import { useSelector } from "react-redux";
import styles from "./Board.module.scss";
import Card from "./card/Card";
import useBoard from "./useBoard";

const Board = () => {
  const images = useSelector((state) => state.roomManager.room.images);
  const { voters, voteForCard } = useBoard();

  return (
    <div className={styles["container"]}>
      {Object.values(images).map((image, index) => (
        <Card
          number={index}
          image={image}
          key={index}
          voters={voters?.get(index)}
          onVote={voteForCard}
          onClick={() => console.log("left click")}
          onContextMenu={() => console.log("right click")}
        />
      ))}
    </div>
  );
};

export default Board;
