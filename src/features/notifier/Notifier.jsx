import styles from "./Notifier.module.scss";
import useNotifier from "./useNotifier";

const Notifier = () => {
  const { text } = useNotifier();

  return (
    <div className={styles["container"]}>
      <div className={styles["notifier"]}>{text}</div>
    </div>
  );
};

export default Notifier;
