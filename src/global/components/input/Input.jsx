import styles from "./Input.module.scss";

const Input = ({ id, className, label, labelClassName, register, formState, showError, ...rest }) => {
  const error = formState && formState.errors?.[id];

  const inputColorClass = error ? styles["input-field-error"] : styles["input-field-regular"];
  const inputClasses = `${styles["input-field"]} ${inputColorClass} ${className || ""}`;

  const labelColorClass = error ? styles["input-label-error"] : styles["input-label-regular"];
  const labelClasses = `${styles["input-label"]} ${labelColorClass} ${labelClassName || ""}`;

  return (
    <div className={styles["input-group"]}>
      <input id={id} className={inputClasses} placeholder=" " {...register} {...rest} />
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      {error && showError && <span className={styles["input-error-message"]}>{error.message}</span>}
    </div>
  );
};

export default Input;
