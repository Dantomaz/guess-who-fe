import styles from "./RadioButton.module.scss";

const RadioButton = ({ name, checked, onChange, children }) => {
  return (
    <label>
      <div className={styles["group"]}>
        {/* this wrapper div is needed for radio button (circle) to be aligned to baseline */}
        <div>
          <input type="radio" name={name} checked={checked} onChange={onChange} />
        </div>
        {children}
      </div>
    </label>
  );
};

export default RadioButton;
