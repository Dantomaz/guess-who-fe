import React from "react";
import styles from "./Button.module.scss";

const Button = ({ children, className, ...rest }) => {
  const defaultClass = className || styles.button;

  return (
    <button className={defaultClass} {...rest}>
      {children}
    </button>
  );
}

export default Button;
