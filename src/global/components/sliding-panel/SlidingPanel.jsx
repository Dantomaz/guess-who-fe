import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./SlidingPanel.module.scss";

const SlidingPanel = ({ children, id, linkRef, show, type, onClickOutsideCallback, style, ...rest }) => {
  const className = `${styles["sliding-panel"]} ${styles[type]}`;

  const ref = useRef();
  useOnClickOutside(ref, (event) => {
    if (!linkRef.current.contains(event.target)) {
      onClickOutsideCallback();
    }
  });

  const transitionClassNames = {
    appear: styles[`${type}-appear`],
    appearActive: styles[`${type}-appear-active`],
    appearDone: styles[`${type}-appear-done`],
    enter: styles[`${type}-enter`],
    enterActive: styles[`${type}-enter-active`],
    enterDone: styles[`${type}-enter-done`],
    exit: styles[`${type}-exit`],
    exitActive: styles[`${type}-exit-active`],
    exitDone: styles[`${type}-exit-done`],
  };

  return (
    <CSSTransition nodeRef={ref} in={show} timeout={300} classNames={transitionClassNames} unmountOnExit>
      <div ref={ref} className={className} style={{ ...style }} {...rest}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default SlidingPanel;
