import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";
import { preventDefaultAction } from "../../global/utils";

const useImageModal = ({ onBackdropClick }) => {
  const [zoom, setZoom] = useState({ current: 1, previous: null });
  const initialPosition = { x: 0, y: 0 };
  const [position, setPosition] = useState(initialPosition);
  const [startingPosition, setStartingPosition] = useState(initialPosition);
  const [positionAfterZoom, setPositionAfterZoom] = useState(initialPosition);
  const { value: isDragging, setTrue: grab, setFalse: release } = useBoolean();
  const containerRef = useRef();
  const imageRef = useRef();
  const timeoutRef = useRef();
  const backdropRef = useRef();

  // animate image scale when zooming
  useGSAP(() => {
    if (!imageRef.current) {
      return;
    }
    // when zooming in, just animate scale
    if (zoom.current > zoom.previous) {
      gsap.to(imageRef.current, {
        scale: zoom.current,
        ease: "power1.out",
        duration: 0.2,
      });
    } else {
      // when zooming out, we need to perform image zoom correction for correct container bounds calculation
      const zoomFactor = zoom.previous - zoom.current;
      gsap
        .timeline()
        // Change image scale to the previous zoom level instantly (one state before the zoom change) to calculate fake position
        // (with container bounds bigger than the container itself). This way the image will scale down and move into container
        // bounds at the same time, giving the impression of smooth zoom correction, keeping the image within bounds.
        .to(imageRef.current, {
          scale: zoom.current + zoomFactor,
          duration: 0,
          // udate fake position after zoom correction is made, to handle image adjustment animation in next useGSAP hook,
          // zoomFactor is used to exaggerate container bounds, which scales the image position accordingly
          onComplete: () => updatePosition(setPositionAfterZoom, position.x, position.y, 1 + zoomFactor),
        })
        // finally, animate the scale
        .to(imageRef.current, {
          scale: zoom.current,
          ease: "power1.out",
          duration: 0.2,
        });
    }
  }, [zoom]);

  // adjust the image position after zooming out
  useGSAP(() => {
    if (imageRef.current) {
      // move the image within container bounds, based on fake position calculated earlier with exaggerated container bounds
      gsap.to(imageRef.current, {
        x: positionAfterZoom.x,
        y: positionAfterZoom.y,
        ease: "power1.out",
        duration: 0.2,
        // when image scale and position is done animating, update the actual image position state for future image position handling
        onComplete: () => updatePosition(setPosition, position.x, position.y),
      });
    }
  }, [positionAfterZoom]);

  // adjust the image position when spanning (or after zoom correction)
  useGSAP(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: position.x, y: position.y, duration: 0 });
    }
  }, [position]);

  const onClick = (e) => {
    preventDefaultAction(e);
    if (zoom.current === 1) {
      setZoom((prev) => ({ current: 3, previous: prev.current }));
    }
  };

  const onRightClick = (e) => {
    preventDefaultAction(e);
    setZoom((prev) => ({ current: 1, previous: prev.current }));
    if (!isDragging) {
      onBackdropClick();
    }
  };

  const handleZoom = (e) => {
    const ZOOM_FACTOR = zoom.current * 0.2;
    console.log(ZOOM_FACTOR);
    if (e.deltaY < 0) {
      setZoom((prev) => ({ current: Math.min(prev.current + ZOOM_FACTOR, 4), previous: prev.current })); // zoom in
    } else {
      setZoom((prev) => ({ current: Math.max(prev.current - ZOOM_FACTOR, 1), previous: prev.current })); // zoom in
    }
  };

  const handleMouseDown = (e) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // allow panning only when zoomed
    if (zoom.current > 1) {
      grab();
      setStartingPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseUp = () => {
    timeoutRef.current = setTimeout(() => {
      release();
    }, 1);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - startingPosition.x;
      const newY = e.clientY - startingPosition.y;
      updatePosition(setPosition, newX, newY);
    }
  };

  // calculate boundaries based on the zoom level and container size
  const calculateBoundaries = (ratio) => {
    if (!containerRef.current || !imageRef.current) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    // calculate the maximum panning allowed
    const minX = Math.min(0, (containerRect.width * ratio - imageRect.width) / 2);
    const maxX = Math.max(0, (imageRect.width - containerRect.width * ratio) / 2);
    const minY = Math.min(0, (containerRect.height * ratio - imageRect.height) / 2);
    const maxY = Math.max(0, (imageRect.height - containerRect.height * ratio) / 2);

    return { minX, maxX, minY, maxY };
  };

  // update position within boundaries
  const updatePosition = (setPositionCallback, x, y, ratio = 1) => {
    const { minX, maxX, minY, maxY } = calculateBoundaries(ratio);
    setPositionCallback({ x: Math.max(minX, Math.min(maxX, x)), y: Math.max(minY, Math.min(maxY, y)) });
  };

  return {
    onClick,
    onRightClick,
    zoom: zoom.current,
    handleZoom,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    position,
    isDragging,
    backdropRef,
    containerRef,
    imageRef,
  };
};

export default useImageModal;
