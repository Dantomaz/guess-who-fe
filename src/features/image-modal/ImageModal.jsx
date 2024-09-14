import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import styles from "./ImageModal.module.scss";
import useImageModal from "./useImageModal";

const ImageModal = ({ image, imageKey, onBackdropClick, show, baseFlipState }) => {
  const {
    onClick,
    onRightClick,
    zoom,
    handleZoom,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    position,
    isDragging,
    backdropRef,
    containerRef,
    imageRef,
  } = useImageModal({ onBackdropClick });
  const flipState = useRef();
  const [delta, setDelta] = useState();

  useLayoutEffect(() => {
    if (show) {
      flipState.current = Flip.getState(containerRef.current);

      const deltaX =
        baseFlipState.current.elementStates[0].bounds.left +
        baseFlipState.current.elementStates[0].bounds.width / 2 -
        flipState.current.elementStates[0].bounds.left -
        flipState.current.elementStates[0].bounds.width / 2;

      const deltaY =
        baseFlipState.current.elementStates[0].bounds.top +
        baseFlipState.current.elementStates[0].bounds.height / 2 -
        flipState.current.elementStates[0].bounds.top -
        flipState.current.elementStates[0].bounds.height / 2;

      // offset the container to prepare for the animation
      gsap.set(containerRef.current, { transform: `translate(${deltaX}px, ${deltaY}px)`, scale: 0 });

      setDelta({ x: deltaX, y: deltaY });
    }
  }, [show, containerRef, baseFlipState]);

  useGSAP(
    () => {
      if (show) {
        // animate the container enter movement
        Flip.to(flipState.current, {
          duration: 0.5,
          scale: 1,
          ease: "power2.out",
        });

        // animate backdrop enter
        gsap.fromTo(
          backdropRef.current,
          {
            opacity: 0,
          },
          { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      }
    },
    { dependencies: [show] }
  );

  const handleExit = (node, done) => {
    if (!show) {
      // animate container exit
      gsap.to(containerRef.current, {
        scale: 0,
        x: delta.x,
        y: delta.y,
        duration: 0.5,
        ease: "power2.out",
        onComplete: done,
      });

      // animate backdrop exit
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  return createPortal(
    <Transition nodeRef={containerRef} in={show} timeout={500} mountOnEnter unmountOnExit onExit={handleExit}>
      <div
        ref={backdropRef}
        className={styles["modal-backdrop"]}
        onClick={onClick}
        onContextMenu={onRightClick}
        onWheel={handleZoom}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
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
              style={{ borderRadius: `${2 / zoom}rem` }}
            />
          </div>
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default ImageModal;
