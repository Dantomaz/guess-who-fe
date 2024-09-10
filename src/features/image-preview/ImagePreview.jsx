import styles from "./ImagePreview.module.scss";
import useImagePreview from "./useImagePreview";

const ImagePreview = ({ image, key }) => {
  const { zoom, handleZoom } = useImagePreview();

  return (
    <div className={styles["image-container"]}>
      <img
        src={`data:image/jpeg;base64,${image}`}
        key={key}
        alt={key}
        draggable={false}
        className={styles["image"]}
        onWheel={handleZoom}
        style={{ transform: `scale(${zoom})` }}
      />
    </div>
  );
};

export default ImagePreview;
