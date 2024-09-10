import { useEffect, useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { preventDefaultAction } from "../../global/utils";

const useImageModal = ({ onBackdropClick }) => {
  const [zoom, setZoom] = useState(1);
  const initialPosition = { x: 0, y: 0 };
  const [position, setPosition] = useState(initialPosition);
  const [startingPosition, setStartingPosition] = useState(initialPosition);
  const { value: isDragging, setTrue: grab, setFalse: release } = useBoolean();
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (zoom === 1) {
      setPosition(initialPosition);
      setStartingPosition(initialPosition);
    } else {
      updatePosition(position.x, position.y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  const onClick = (e) => {
    preventDefaultAction(e);
    if (!isDragging) {
      onBackdropClick();
    }
  };

  const onRightClick = (e) => {
    setZoom(1);
    onClick(e);
  };

  const handleZoom = (e) => {
    const ZOOM_FACTOR = 0.2;
    if (e.deltaY < 0) {
      setZoom((prevZoom) => Math.min(prevZoom + ZOOM_FACTOR, 3)); // zoom in
    } else {
      setZoom((prevZoom) => Math.max(prevZoom - ZOOM_FACTOR, 1)); // zoom out
    }
  };

  const handleMouseDown = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // allow panning only when zoomed
    if (zoom > 1) {
      grab();
      setStartingPosition({ x: e.clientX - position.x * zoom, y: e.clientY - position.y * zoom });
    }
  };

  const handleMouseUp = (e) => {
    timeoutRef.current = setTimeout(() => {
      release();
    }, 1);
    return false;
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = (e.clientX - startingPosition.x) / zoom;
      const newY = (e.clientY - startingPosition.y) / zoom;
      updatePosition(newX, newY);
    }
  };

  // calculate boundaries based on the zoom level and container size
  const calculateBoundaries = () => {
    if (!containerRef.current || !imageRef.current) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    // calculate the maximum panning allowed
    const minX = Math.min(0, (containerRect.width - imageRect.width) / zoom / 2);
    const maxX = Math.max(0, (imageRect.width - containerRect.width) / zoom / 2);
    const minY = Math.min(0, (containerRect.height - imageRect.height) / zoom / 2);
    const maxY = Math.max(0, (imageRect.height - containerRect.height) / zoom / 2);

    return { minX, maxX, minY, maxY };
  };

  // update position within boundaries
  const updatePosition = (x, y) => {
    const { minX, maxX, minY, maxY } = calculateBoundaries();
    setPosition({ x: Math.max(minX, Math.min(maxX, x)), y: Math.max(minY, Math.min(maxY, y)) });
  };

  return { onClick, onRightClick, zoom, handleZoom, handleMouseDown, handleMouseUp, handleMouseMove, position, isDragging, containerRef, imageRef };
};

export default useImageModal;
