import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { getGridTemplateColumnsEstimate } from "../../../global/utils";
import styles from "./DragAndDropPreview.module.scss";

const DragAndDropPreview = ({ images, newFiles }) => {
  const empty = !newFiles && !images;

  return empty ? (
    <div className={`${styles["empty"]}`}>
      <div className="flex-vertical">
        <p>{"Click here"}</p>
        <p>{"or drag & drop the files"}</p>
        <FaFileUpload className={styles["upload-icon"]} />
      </div>
    </div>
  ) : newFiles ? (
    <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsEstimate(newFiles.length)}>
      {newFiles.map((file, index) => (
        <img src={URL.createObjectURL(file)} key={index} alt={index} draggable={false} className={styles["image"]} />
      ))}
    </div>
  ) : (
    <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsEstimate(Object.values(images).length)}>
      {Object.values(images).map((file, index) => (
        <img src={`data:image/jpeg;base64,${file}`} key={index} alt={index} draggable={false} className={styles["image"]} />
      ))}
    </div>
  );
};

export default DragAndDropPreview;
