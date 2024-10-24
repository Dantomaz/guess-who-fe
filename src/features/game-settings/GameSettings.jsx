import React from "react";
import Button from "../../global/components/button/Button";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const { isDragAndDropVisible, showDragAndDrop, hideDragAndDrop, uploadImages, ready, isStartButtonDisabled, prepareGame } = useGameSettings();

  return (
    <div className={styles["card"]}>
      {isDragAndDropVisible ? (
        <DragAndDrop uploadFiles={uploadImages} onCancel={hideDragAndDrop} />
      ) : (
        <>
          <Button onClick={showDragAndDrop}>Upload images</Button>
          {ready && (
            <Button onClick={prepareGame} disabled={isStartButtonDisabled}>
              Start game
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default GameSettings;
