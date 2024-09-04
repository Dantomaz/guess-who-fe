import React from "react";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const { uploadImages } = useGameSettings();

  const temp = (image, index) => {
    return <img src={`data:image/jpeg;base64,${image}`} key={index} alt={index} width={64} height={64} />;
  };

  return (
    <div className={styles["card"]}>
      <DragAndDrop uploadFiles={uploadImages} />
    </div>
  );
};

export default GameSettings;
