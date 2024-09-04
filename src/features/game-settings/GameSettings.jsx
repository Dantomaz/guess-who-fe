import React from "react";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const { uploadImages } = useGameSettings();

  return (
    <div className={styles["card"]}>
      <DragAndDrop uploadFiles={uploadImages} />
    </div>
  );
};

export default GameSettings;
