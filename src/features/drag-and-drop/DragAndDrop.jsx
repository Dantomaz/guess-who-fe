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
        <p>
          Images will be compressed automatically to improve performance, but compressing high quality images will take some time and CPU power.
          Please be patient.
        </p>
        <p>Consider lowering the size of your images first, before uploading if they are larger than 500KB each.</p>
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
