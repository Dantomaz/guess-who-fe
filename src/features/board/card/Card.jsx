import React from "react";
import styles from "./Card.module.scss";

const Card = ({ number, image }) => {
  return (
    <div className={styles["card"]}>
      {number}
      <img src={`data:image/jpeg;base64,${image}`} key={number} alt={number} className={styles["image"]} />
    </div>
  );
};

export default Card;
