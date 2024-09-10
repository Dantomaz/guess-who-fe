import styles from "./ImagePreview.module.scss";
import useImagePreview from "./useImagePreview";

const ImagePreview = ({ image, key }) => {
  const { zoom, handleZoom, handleMouseDown, handleMouseUp, handleMouseMove, position, isDragging } = useImagePreview();

  return (
    <div className={styles["image-container"]}>
      <img
        src={`data:image/jpeg;base64,${image}`}
        key={key}
        alt={key}
        draggable={false}
        className={styles["image"]}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`, cursor: isDragging ? "grabbing" : "grab" }}
      />
    </div>
  );
};

export default ImagePreview;
