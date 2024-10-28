import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { getGridTemplateColumnsEstimate } from "../../../global/utils";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import styles from "./DragAndDropPreview.module.scss";

const DragAndDropPreview = ({ images, isLoading }) => {
  const renderLoading = () => {
    // compression in progress
    return (
      <div className={`${styles["empty"]}`}>
        <LoadingSpinner />
        <div>Please wait...</div>
      </div>
    );
  };

  const renderImagesGrid = () => {
    return (
      <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsEstimate(images.length)}>
        {images && images.map((imageUrl, index) => <img src={imageUrl} key={index} alt={index} draggable={false} className={styles["image"]} />)}
      </div>
    );
  };

  const renderDragAndDropPrompt = () => {
    return (
      <div className={`${styles["empty"]}`}>
        <div className="flex-vertical">
          <p>{"Click here"}</p>
          <p>{"or drag & drop the files"}</p>
          <FaFileUpload className={styles["upload-icon"]} />
        </div>
      </div>
    );
  };

  return isLoading ? renderLoading() : images ? renderImagesGrid() : renderDragAndDropPrompt();
};

export default DragAndDropPreview;
