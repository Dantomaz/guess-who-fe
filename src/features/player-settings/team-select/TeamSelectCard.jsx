import React from "react";
import Button from "../../../global/components/button/Button";
import styles from "./TeamSelectCard.module.scss";

function TeamSelectCard({ name, text, onClick, style, disabled }) {
  return (
    <Button
      className={`${styles["button"]} ${styles[name.toLowerCase()]} ${disabled && styles["button-disabled"]}`}
      overrideClasses
      style={style}
      onClick={() => onClick(name)}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}

export default TeamSelectCard;
