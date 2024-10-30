import React, { forwardRef } from "react";
import styles from "./Button.module.scss";

const Button = forwardRef(({ children, className, overrideClasses, disabled, ...rest }, ref) => {
  const defaultClasses = `${styles["button"]} ${disabled && styles["button-disabled"]} ${className || ""}`;

  return (
    // Wrapper is needed to stop button from growing to fill available space
    <div className={styles["button-wrapper"]}>
      <button ref={ref} className={overrideClasses ? className : defaultClasses} {...rest} disabled={disabled}>
        {children}
      </button>
    </div>
  );
});

export default Button;
