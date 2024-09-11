import { createPortal } from "react-dom";
import styles from "./ImageModal.module.scss";
import useImageModal from "./useImageModal";

const ImageModal = ({ image, imageKey, onBackdropClick }) => {
  const { onClick, onRightClick, zoom, handleZoom, handleMouseDown, handleMouseUp, handleMouseMove, position, isDragging, containerRef, imageRef } =
    useImageModal({ onBackdropClick });

  return createPortal(
    <div
      className={styles["modal-backdrop"]}
      onClick={onClick}
      onContextMenu={onRightClick}
      onWheel={handleZoom}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      style={{
        cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
      }}
    >
      <div className={styles["modal-container"]}>
        <div ref={containerRef} className={styles["image-container"]}>
          <img
            ref={imageRef}
            src={`data:image/jpeg;base64,${image}`}
            key={imageKey}
            alt={imageKey}
            draggable={false}
            className={styles["image"]}
            style={{
              transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              borderRadius: `${2 / zoom}rem`,
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
