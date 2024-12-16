import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Button.module.scss";

const Button = forwardRef(({ children, className, overrideClasses, disabled, enableApiLock, ...rest }, ref) => {
  const isApiRequestPending = useSelector((state) => state.lockManager.isApiRequestPending);
  const isDisabled = disabled || (enableApiLock && isApiRequestPending);
  const defaultClasses = `${styles["button"]} ${isDisabled && styles["button-disabled"]} ${className || ""}`;

  return (
    <button ref={ref} className={overrideClasses ? className : defaultClasses} {...rest} disabled={isDisabled}>
      {children}
    </button>
  );
});

export default Button;
