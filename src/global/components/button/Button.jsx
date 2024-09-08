import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef(({ children, className, overrideClasses, disabled, ...rest }, ref) => {
  const defaultClasses = `${styles["button"]} ${disabled && styles["button-disabled"]} ${className || ""}`;

  return (
    <button ref={ref} className={overrideClasses ? className : defaultClasses} {...rest} disabled={disabled}>
      {children}
    </button>
  );
});

export default Button;
