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

  const ANIMATION_DURATION_IN_SECONDS = 0.5;
  const ANIMATION_STYLE_FROM = {
    height: 0,
    opacity: 0,
    duration: ANIMATION_DURATION_IN_SECONDS,
    ease: "power2.out",
  };
  const ANIMATION_STYLE_TO = {
    height: "auto",
    opacity: 1,
    duration: ANIMATION_DURATION_IN_SECONDS,
    ease: "power2.out",
  };

  // Animate enter
  useGSAP(
    () => {
      if (showHints) {
        gsap.fromTo(hintsRef.current, ANIMATION_STYLE_FROM, {
          ...ANIMATION_STYLE_TO,
          onStart: () => gsap.to(textRef.current, { opacity: 1 }),
          onInterrupt: () => gsap.to(textRef.current, { opacity: 0 }),
        });
      }
    },
    { dependencies: [showHints] }
  );

  // Animate exit
  const handleExit = () => {
    gsap.to(textRef.current, { opacity: 0, duration: ANIMATION_DURATION_IN_SECONDS });
    gsap.to(hintsRef.current, ANIMATION_STYLE_FROM);
  };

  // Animate text swap on context change
  useGSAP(
    () => {
      if (showHints) {
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
            ease: "power1.inOut",
            duration: ANIMATION_DURATION_IN_SECONDS,
          },
          {
            opacity: 1,
            ease: "power1.inOut",
            duration: ANIMATION_DURATION_IN_SECONDS,
          }
        );
      }
    },
    { dependencies: [showHints, hintsContext] }
  );

  return createPortal(
    <Transition nodeRef={hintsRef} in={showHints} timeout={ANIMATION_DURATION_IN_SECONDS * 1000} mountOnEnter unmountOnExit onExit={handleExit}>
      <div ref={hintsRef} className={styles["hints-card"]}>
        <div ref={textRef} className={styles["text-container"]}>
          <p className={styles["title"]}>{t("hints.header")}</p>
          {text}
        </div>
      </div>
    </Transition>,
    document.body
  );
};

export default Hints;
