import styles from "./Input.module.scss";

const Input = ({ id, className, label, labelClassName, register, formState, ...rest }) => {
  const error = formState.errors?.[id];

  const inputColorClass = error ? styles["input-field-error"] : styles["input-field-regular"];
  const inputClasses = `${className || styles["input-field"]} ${inputColorClass}`;

  const labelColorClass = error ? styles["input-label-error"] : styles["input-label-regular"];
  const labelClasses = `${labelClassName || styles["input-label"]} ${labelColorClass}`;

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input id={id} className={inputClasses} {...register} {...rest} />
      {/* {error && <span className={styles["input-error-message"]}>{error.message}</span>} */}
    </div>
  );
}

export default Input;
