import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef(({ children, className, overrideClasses, disabled, ...rest }, ref) => {
  const defaultClass = `${styles.button} ${className || ""} ${disabled && styles["button-disabled"]}`;

  return (
    <button ref={ref} className={overrideClasses ? className : defaultClass} {...rest}>
      {children}
    </button>
  );
});

export default Button;
