import React from "react";
import styles from "./GameSettings.module.scss";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const { uploadFiles } = useGameSettings();

  return (
    <div className={styles["card"]}>
      <DragAndDrop uploadFiles={uploadFiles} />
    </div>
  );
};

export default GameSettings;
