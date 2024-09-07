import React from "react";
import Button from "../../../global/components/button/Button";
import styles from "./TeamSelectCard.module.scss";

function TeamSelectCard({ name, text, onClick, style }) {
  const classColor = styles[name];
  const classes = `${styles["card"]} ${classColor}`;

  return (
    <Button className={classes} overrideClasses style={style} onClick={() => onClick(name)}>
      {text}
    </Button>
  );
}

export default TeamSelectCard;
