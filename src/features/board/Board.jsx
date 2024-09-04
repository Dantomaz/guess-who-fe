import React from "react";
import { useSelector } from "react-redux";
import styles from "./Board.module.scss";
import Card from "./card/Card";

const Board = () => {
  const images = useSelector((state) => state.roomManager.room.images);

  return (
    <div className={styles["container"]}>
      {Object.values(images).map((image, index) => (
        <Card number={index} image={image} key={index} />
      ))}
    </div>
  );
};

export default Board;
