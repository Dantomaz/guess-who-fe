import React from "react";
import { useSelector } from "react-redux";
import styles from "./ImagePreview.module.scss";

const ImagePreview = () => {
  const images = useSelector((state) => state.roomManager.room.images);

  return (
    <div className={styles["container"]}>
      {images &&
        Object.values(images).map((image, index) => (
          <img src={`data:image/jpeg;base64,${image}`} key={index} alt={index} draggable={false} className={styles["image"]} />
        ))}
    </div>
  );
};

export default ImagePreview;
