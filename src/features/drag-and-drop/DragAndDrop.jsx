import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import styles from "./DragAndDrop.module.scss";
import DragAndDropPreview from "./drag-and-drop-preview/DragAndDropPreview";
import useDragAndDrop from "./useDragAndDrop";

const DragAndDrop = ({ uploadFiles, cancel }) => {
  const images = useSelector((state) => state.roomManager.room?.images);
  const { fileTypes, onFilesChange, files, MAX_FILES } = useDragAndDrop();

  return (
    <>
      <p>Upload images for this game!</p>
      <FileUploader classes={styles["drop-area-container"]} multiple types={fileTypes} handleChange={onFilesChange}>
        <DragAndDropPreview images={images} newFiles={files} />
      </FileUploader>
      <div className={styles["counter"]}>
        {files?.length || images?.length || 0}/{MAX_FILES} images
      </div>
      <div className={styles["footer"]}>
        {<Button onClick={cancel}>Cancel</Button>}
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
