import React from "react";
import { useTranslation } from "react-i18next";
import { FaFileUpload } from "react-icons/fa";
import { getGridTemplateColumnsNumber } from "../../../global/utils";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import styles from "./DragAndDropPreview.module.scss";

const DragAndDropPreview = ({ images, isLoading }) => {
  const { t } = useTranslation();
  const renderLoading = () => {
    // compression in progress
    return (
      <div className={`${styles["empty"]}`}>
        <LoadingSpinner />
        <div>{t("game-settings.drag-and-drop.drop-area.wait")}</div>
      </div>
    );
  };

  const renderImagesGrid = () => {
    return (
      <div className={`${styles["drop-area"]}`} style={getGridTemplateColumnsNumber(images.length)}>
        {images && images.map((url, index) => <img src={url} key={index} alt={index} draggable={false} className={styles["image"]} />)}
      </div>
    );
  };

  const renderDragAndDropPrompt = () => {
    return (
      <div className={`${styles["empty"]}`}>
        <div className="flex-vertical">
          <p>{t("game-settings.drag-and-drop.drop-area.p1")}</p>
          <p>{t("game-settings.drag-and-drop.drop-area.p2")}</p>
          <FaFileUpload className={styles["upload-icon"]} />
        </div>
      </div>
    );
  };

  return isLoading ? renderLoading() : images && images.length > 0 ? renderImagesGrid() : renderDragAndDropPrompt();
};

export default DragAndDropPreview;
