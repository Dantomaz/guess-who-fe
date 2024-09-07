import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaFileUpload } from "react-icons/fa";
import Button from "../../global/components/button/Button";
import styles from "./DragAndDrop.module.scss";
import useDragAndDrop from "./useDragAndDrop";

const DragAndDrop = ({ uploadFiles }) => {
  const { fileTypes, onFilesChange, files, MAX_FILES } = useDragAndDrop();

  return (
    <>
      <p>Upload images for this game!</p>
      <FileUploader classes={styles["drop-area-container"]} multiple types={fileTypes} handleChange={onFilesChange}>
        <div className={`${styles["drop-area"]} ${!files && styles["empty"]}`}>
          {files ? (
            files.map((file, index) => <img src={URL.createObjectURL(file)} key={index} alt={index} draggable={false} width={64} height={64} />)
          ) : (
            <div className="flex-vertical">
              <p>{"Click here"}</p>
              <p>{"or drag & drop the files"}</p>
              <FaFileUpload className={styles["upload-icon"]} />
            </div>
          )}
        </div>
      </FileUploader>
      <div className={styles["footer"]}>
        {files ? files.length : 0}/{MAX_FILES} images {files && <Button onClick={() => uploadFiles(files)}>Upload</Button>}
      </div>
    </>
  );
};

export default DragAndDrop;
