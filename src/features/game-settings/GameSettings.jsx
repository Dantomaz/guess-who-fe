import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../global/components/button/Button";
import RadioButton from "../../global/components/radio-button/RadioButton";
import "../../global/styles/classes.scss";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import styles from "./GameSettings.module.scss";
import useGameSettings from "./useGameSettings";
import { MdSupervisorAccount } from "react-icons/md";

const GameSettings = () => {
  const { t } = useTranslation();
  const {
    isDragAndDropVisible,
    showDragAndDrop,
    imagesUploaded,
    uploadImages,
    isStartButtonDisabled,
    numberOfAllPlayers,
    numberOfPlayersInTeam,
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
              {t("game-settings.checkbox.images-default")}
            </RadioButton>
            <div className={styles["option-wrapper"]}>
              <RadioButton name="custom" checked={!useDefaultImages} onChange={onSetCustomImages}>
                {t("game-settings.checkbox.images-custom")}
              </RadioButton>
              {showCustomImagesEditButton && (
                <Button onClick={showDragAndDrop} className={styles["option-button"]}>
                  {t("game-settings.button.edit")}
                </Button>
              )}
            </div>
          </div>
          <Button onClick={prepareGame} disabled={isStartButtonDisabled}>
            {t("game-settings.button.start")}
            <div className={styles["icon-wrapper"]}>
              {<MdSupervisorAccount />}
              {`${numberOfPlayersInTeam}/${numberOfAllPlayers}`}
            </div>
          </Button>
        </>
      )}
    </div>
  );
};

export default GameSettings;
