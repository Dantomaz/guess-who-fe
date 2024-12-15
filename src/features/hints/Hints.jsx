import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";
import styles from "./Hints.module.scss";
import useHints from "./useHints";

const Hints = () => {
  const { t } = useTranslation();
  const { text } = useHints();
  const showHints = useSelector((state) => state.hintsManager.showHints);
  const hintsContext = useSelector((state) => state.hintsManager.context);
  const hintsRef = useRef();
  const textRef = useRef();

  const ANIMATION_DURATION_IN_SECONDS = 0.4;

  // Animate enter
  useGSAP(
    () => {
      if (showHints) {
        gsap.fromTo(
          hintsRef.current,
          { height: 0, opacity: 0, ease: "power2.out" },
          { height: "40vh", opacity: 1, duration: ANIMATION_DURATION_IN_SECONDS }
        );
        gsap.to(textRef.current, { opacity: 1, duration: ANIMATION_DURATION_IN_SECONDS });
      }
    },
    { dependencies: [showHints] }
  );

  // Animate exit
  const handleExit = () => {
    gsap.to(hintsRef.current, {
      height: 0,
      opacity: 0,
      duration: ANIMATION_DURATION_IN_SECONDS,
      ease: "power2.in",
    });
    gsap.to(textRef.current, { opacity: 0, duration: ANIMATION_DURATION_IN_SECONDS });
  };

  // Animate text swap on context change
  useGSAP(
    () => {
      if (showHints) {
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            ease: "power1.inOut",
            duration: ANIMATION_DURATION_IN_SECONDS,
          }
        );
      }
    },
    { dependencies: [hintsContext] }
  );

  return createPortal(
    <Transition nodeRef={hintsRef} in={showHints} timeout={ANIMATION_DURATION_IN_SECONDS * 1000} mountOnEnter unmountOnExit onExit={handleExit}>
      <div ref={hintsRef} className={styles["hints-card"]}>
        <div ref={textRef} className={styles["text-container"]}>
          <div className={styles["header"]}>{t("hints.header")}</div>
          <div className={styles["content"]}>{text}</div>
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default Hints;
