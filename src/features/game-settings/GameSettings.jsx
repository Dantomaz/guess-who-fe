import React from "react";
import Button from "../../global/components/button/Button";
import RadioButton from "../../global/components/radio-button/RadioButton";
import "../../global/styles/classes.scss";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import useGameSettings from "./useGameSettings";

const GameSettings = () => {
  const {
    isDragAndDropVisible,
    showDragAndDrop,
    imagesUploaded,
    uploadImages,
    isStartButtonDisabled,
    prepareGame,
    useDefaultImages,
    onSetDefaultImages,
    onSetCustomImages,
    onCancelCustomImages,
  } = useGameSettings();

  const showCustomImagesEditButton = imagesUploaded && !useDefaultImages;

  return (
    <div className={styles["card"]}>
      {isDragAndDropVisible ? (
        <DragAndDrop uploadFiles={uploadImages} onCancel={onCancelCustomImages} />
      ) : (
        <>
          <div className={styles["options"]}>
            <RadioButton name="default" checked={useDefaultImages} onChange={onSetDefaultImages}>
              Use default images
            </RadioButton>
            <div className={styles["option-wrapper"]}>
              <RadioButton name="custom" checked={!useDefaultImages} onChange={onSetCustomImages}>
                Use custom images (min. 12)
              </RadioButton>
              {showCustomImagesEditButton && (
                <Button onClick={showDragAndDrop} className={styles["option-button"]}>
                  Edit
                </Button>
              )}
            </div>
          </div>
          <Button onClick={prepareGame} disabled={isStartButtonDisabled}>
            Start game
          </Button>
        </>
      )}
    </div>
  );
};

export default GameSettings;
