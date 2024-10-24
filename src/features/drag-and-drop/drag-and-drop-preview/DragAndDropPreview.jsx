import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { getGridTemplateColumnsEstimate } from "../../../global/utils";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import styles from "./DragAndDropPreview.module.scss";

const DragAndDropPreview = ({ images, newFiles, isLoading }) => {
  const empty = !newFiles && !images;

  return isLoading ? (
    // if images are being uploaded right now (compression in progress) -> render the spinner
    <div className={`${styles["empty"]}`}>
      <LoadingSpinner />
    </div>
  ) : empty ? (
    // if no images have been uploaded yet -> render drag & drop text
    <div className={`${styles["empty"]}`}>
      <div className="flex-vertical">
        <p>{"Click here"}</p>
        <p>{"or drag & drop the files"}</p>
        <FaFileUpload className={styles["upload-icon"]} />
      </div>
    </div>
  ) : newFiles ? (
    // if images have been uploaded only locally -> convert to url and display it
    <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsEstimate(newFiles.length)}>
      {newFiles.map((file, index) => (
        <img src={URL.createObjectURL(file)} key={index} alt={index} draggable={false} className={styles["image"]} />
      ))}
    </div>
  ) : (
    // if images have been already uploaded to the server -> display using url
    <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsEstimate(images.length)}>
      {images && images.map((imageUrl, index) => <img src={imageUrl} key={index} alt={index} draggable={false} className={styles["image"]} />)}
    </div>
  );
};

export default DragAndDropPreview;
