import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import Modal from "../../global/components/modal/Modal";
import styles from "./DragAndDrop.module.scss";
import DragAndDropPreview from "./drag-and-drop-preview/DragAndDropPreview";
import useDragAndDrop from "./useDragAndDrop";

const DragAndDrop = ({ uploadFiles, onCancel }) => {
  const { t } = useTranslation();
  const images = useSelector((state) => state.roomManager.room?.images);
  const { fileTypes, onFilesChange, abortCompression, files, MAX_FILES, isLoading, feedback, clearFeedback } = useDragAndDrop();

  const imagesToPreview = files ? files.map(URL.createObjectURL) : images;
  const imageCounter = imagesToPreview?.length || 0;

  const handleCancel = () => {
    abortCompression();
    onCancel();
  };

  return (
    <>
      <div className={styles["hint"]}>
        <p>{t("game-settings.drag-and-drop.text.p1")}</p>
        <p>{t("game-settings.drag-and-drop.text.p2")}</p>
        <p>{t("game-settings.drag-and-drop.text.p3")}</p>
      </div>
      <FileUploader classes={styles["drop-area-container"]} multiple types={fileTypes} handleChange={onFilesChange}>
        <DragAndDropPreview images={imagesToPreview} isLoading={isLoading} />
      </FileUploader>
      <div className={styles["counter"]}>{t("game-settings.drag-and-drop.counter", { count: imageCounter, countTotal: MAX_FILES })}</div>
      <div className={styles["footer"]}>
        {<Button onClick={handleCancel}>{t("game-settings.drag-and-drop.button.cancel")}</Button>}
        {
          <Button onClick={() => uploadFiles(files)} enableApiLock={true} disabled={!files || isLoading}>
            {t("game-settings.drag-and-drop.button.save")}
          </Button>
        }
      </div>
      <Modal show={feedback.display} header={t("game-settings.drag-and-drop.modal-error.title")} body={feedback.message} onOk={clearFeedback} />
    </>
  );
};

export default DragAndDrop;
