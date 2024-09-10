import { useState } from "react";

const useImagePreview = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoom = (e) => {
    let zoomFactor = 0.2; // zooming in
    if (e.deltaY > 0) {
      zoomFactor = -zoomFactor; // if zooming out, change to negative
    }
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + zoomFactor, 1), 3));
  };

  return { zoom, handleZoom };
};

export default useImagePreview;
