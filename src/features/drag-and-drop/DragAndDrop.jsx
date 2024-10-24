import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import styles from "./DragAndDrop.module.scss";
import DragAndDropPreview from "./drag-and-drop-preview/DragAndDropPreview";
import useDragAndDrop from "./useDragAndDrop";

const DragAndDrop = ({ uploadFiles, onCancel }) => {
  const images = useSelector((state) => state.roomManager.room?.images);
  const { fileTypes, onFilesChange, abortCompression, files, MAX_FILES, isLoading } = useDragAndDrop();
  const imageCounter = files?.length || images?.length || 0;

  const handleCancel = () => {
    abortCompression();
    onCancel();
  };

  return (
    <>
      <div className={styles["hint"]}>
        <p>High quality images will take longer time to upload. Consider compressing them first!</p>
        <p>If any of the images is larger than 1MB, it will be compressed automatically. This takes time and CPU power. Please be patient.</p>
      </div>
      <FileUploader classes={styles["drop-area-container"]} multiple types={fileTypes} handleChange={onFilesChange}>
        <DragAndDropPreview images={images} newFiles={files} isLoading={isLoading} />
      </FileUploader>
      <div className={styles["counter"]}>{`${imageCounter}/${MAX_FILES} images`}</div>
      <div className={styles["footer"]}>
        {<Button onClick={handleCancel}>Cancel</Button>}
        {
          <Button onClick={() => uploadFiles(files)} disabled={!files}>
            Upload
          </Button>
        }
      </div>
    </>
  );
};

export default DragAndDrop;
