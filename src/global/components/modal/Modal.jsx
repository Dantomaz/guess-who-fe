import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import Button from "../button/Button";
import styles from "./Modal.module.scss";

const Modal = ({ show, header, body, onOk, okText, onCancel, cancelText, style }) => {
  const ModalHeader = () => {
    return <div className={styles["header"]}>{header}</div>;
  };

  const ModalBody = () => {
    return <div className={styles["body"]}>{body}</div>;
  };

  const ModalFooter = () => {
    const bothButtonsShown = onOk && onCancel;
    const footerJustifyStyle = bothButtonsShown ? "space-between" : "center";
    const buttonWidth = bothButtonsShown ? "6vw" : "10vw";

    return (
      <div className={styles["footer"]} style={{ justifyContent: footerJustifyStyle }}>
        {onOk && (
          <Button onClick={onOk} style={{ width: buttonWidth }}>
            {okText || "Okay"}
          </Button>
        )}
        {onCancel && (
          <Button onClick={onCancel} style={{ width: buttonWidth }}>
            {cancelText || "Cancel"}
          </Button>
        )}
      </div>
    );
  };

  // animations
  const backdropRef = useRef();
  const modalRef = useRef();
  const MODAL_ENTERING_FROM_POS = { yPercent: -100 };
  const MODAL_IDLE_POS = { xPercent: -50, yPercent: -75 };
  const MODAL_EXITING_TO_POS = { yPercent: -50 };
  const EXIT_ANIMATION_DURATION_IN_SEC = 0.2;
  const EXIT_ANIMATION_STYLE = { duration: EXIT_ANIMATION_DURATION_IN_SEC, ease: "power2.out" };

  useGSAP(
    () => {
      if (show) {
        gsap.set(modalRef.current, { ...MODAL_IDLE_POS });

        // animate modal enter
        gsap.from(modalRef.current, {
          ...MODAL_ENTERING_FROM_POS,
          ...EXIT_ANIMATION_STYLE,
        });

        // animate backdrop enter
        gsap.from(backdropRef.current, {
          opacity: 0,
          ...EXIT_ANIMATION_STYLE,
        });
      }
    },
    { dependencies: [show] }
  );

  const handleExit = () => {
    // animate modal exit
    gsap.to(modalRef.current, {
      ...MODAL_EXITING_TO_POS,
      ...EXIT_ANIMATION_STYLE,
    });

    // animate backdrop exit
    gsap.to(backdropRef.current, {
      opacity: 0,
      ...EXIT_ANIMATION_STYLE,
    });
  };

  // actual component render
  return createPortal(
    <Transition nodeRef={modalRef} in={show} timeout={EXIT_ANIMATION_DURATION_IN_SEC * 1000} mountOnEnter unmountOnExit onExit={handleExit}>
      <div ref={backdropRef} className={styles["modal-backdrop"]}>
        <div ref={modalRef} className={styles["modal-container"]} style={style}>
          {header && <ModalHeader />}
          {body && <ModalBody />}
          <ModalFooter />
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default Modal;
