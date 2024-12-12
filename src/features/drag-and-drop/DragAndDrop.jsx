import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import Modal from "../../global/components/modal/Modal";
import styles from "./DragAndDrop.module.scss";
import DragAndDropPreview from "./drag-and-drop-preview/DragAndDropPreview";
import useDragAndDrop from "./useDragAndDrop";

const DragAndDrop = ({ uploadFiles, onCancel }) => {
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
        <p>
          Images will be compressed automatically to improve performance, but compressing high quality images will take some time and CPU power.
          Please be patient.
        </p>
        <p>Consider lowering the size of your images first, before saving them if they are larger than 200KB each.</p>
        <p>Image ratio of 1:1 is the most optimal.</p>
      </div>
      <FileUploader classes={styles["drop-area-container"]} multiple types={fileTypes} handleChange={onFilesChange}>
        <DragAndDropPreview images={imagesToPreview} isLoading={isLoading} />
      </FileUploader>
      <div className={styles["counter"]}>{`${imageCounter}/${MAX_FILES} images`}</div>
      <div className={styles["footer"]}>
        {<Button onClick={handleCancel}>Cancel</Button>}
        {
          <Button onClick={() => uploadFiles(files)} enableApiLock={true} disabled={!files}>
            Save
          </Button>
        }
      </div>
      <Modal show={feedback.display} header={"Could not save images!"} body={feedback.message} onOk={clearFeedback} />
    </>
  );
};

export default DragAndDrop;
