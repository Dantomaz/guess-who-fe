import { useEffect, useState } from "react";

const useImagePreview = () => {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const initialPosition = { x: 0, y: 0 };
  const [position, setPosition] = useState(initialPosition);
  const [startPos, setStartPos] = useState(initialPosition);

  useEffect(() => {
    if (zoom === 1) {
      setPosition(initialPosition);
      setStartPos(initialPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  const handleZoom = (e) => {
    let zoomFactor = 0.2; // zooming in
    if (e.deltaY > 0) {
      zoomFactor = -zoomFactor; // if zooming out, change to negative
    }
    setZoom((prevZoom) => Math.min(Math.max(prevZoom + zoomFactor, 1), 3));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    // allow panning only when zoomed
    if (zoom > 1) {
      setIsDragging(true);
      setStartPos({ x: e.clientX - position.x * zoom, y: e.clientY - position.y * zoom });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: (e.clientX - startPos.x) / zoom, y: (e.clientY - startPos.y) / zoom });
    }
  };

  return { zoom, handleZoom, handleMouseDown, handleMouseUp, handleMouseMove, position, isDragging };
};

export default useImagePreview;
