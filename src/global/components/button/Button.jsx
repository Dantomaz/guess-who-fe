import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef(({ children, className, overrideClasses, ...rest }, ref) => {
  const defaultClass = `${styles.button} ${className || ""}`;

  return (
    <button ref={ref} className={overrideClasses ? className : defaultClass} {...rest}>
      {children}
    </button>
  );
});

export default Button;
