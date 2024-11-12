import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import { useOnClickOutside } from "usehooks-ts";
import Button from "../../../global/components/button/Button";
import styles from "./PlayerOptions.module.scss";
import usePlayerOptionsButton from "./usePlayerOptionsButton";

const PlayerOptions = ({ player, show, onClickOutsideCallback }) => {
  const { makeHost, kickPlayer } = usePlayerOptionsButton({ onClose: onClickOutsideCallback });
  const containerRef = useRef();

  useOnClickOutside(
    containerRef,
    () => {
      setTimeout(onClickOutsideCallback, 20); // delayed by unnoticable amount, to trigger after check in PlayerButton.jsx for UX reasons
    },
    "mouseup"
  );

  // animations
  const EXIT_ANIMATION_DURATION_IN_SEC = 0.2;
  const EXIT_ANIMATION_STYLE = { duration: EXIT_ANIMATION_DURATION_IN_SEC, ease: "power1.out" };

  useGSAP(
    () => {
      if (show) {
        // animate options enter
        gsap.fromTo(
          containerRef.current,
          {
            xPercent: -20,
            opacity: 0,
            ...EXIT_ANIMATION_STYLE,
          },
          {
            xPercent: 0,
            opacity: 1,
            ...EXIT_ANIMATION_STYLE,
          }
        );
      }
    },
    { dependencies: [show] }
  );

  const handleExit = () => {
    // animate options exit
    gsap.to(containerRef.current, {
      xPercent: 30,
      opacity: 0,
      ...EXIT_ANIMATION_STYLE,
    });
  };

  return (
    <Transition nodeRef={containerRef} in={show} timeout={EXIT_ANIMATION_DURATION_IN_SEC * 1000} mountOnEnter unmountOnExit onExit={handleExit}>
      <div ref={containerRef} className={styles["container"]}>
        <Button onClick={() => makeHost(player.id)}>Make host</Button>
        <Button className={styles["button-danger"]} onClick={() => kickPlayer(player.id)}>
          Kick
        </Button>
      </div>
    </Transition>
  );
};

export default PlayerOptions;
