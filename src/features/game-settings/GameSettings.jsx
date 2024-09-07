import React from "react";
import Button from "../../global/components/button/Button";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import ImagePreview from "./image-preview/ImagePreview";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const { isDragAndDropVisible, showDragAndDrop, uploadImages, ready, prepareGame } = useGameSettings();

  return (
    <div className={styles["card"]}>
      SETTINGS
      {isDragAndDropVisible && <DragAndDrop uploadFiles={uploadImages} />}
      {!isDragAndDropVisible && (
        <>
          <Button onClick={showDragAndDrop}>Upload images</Button>
          <ImagePreview />
          {ready && <Button onClick={prepareGame}>Start game</Button>}
        </>
      )}
    </div>
  );
};

export default GameSettings;
