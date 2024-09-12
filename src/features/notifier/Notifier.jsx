import styles from "./Notifier.module.scss";
import useNotifier from "./useNotifier";

const Notifier = () => {
  const { textRef } = useNotifier();

  return (
    <div className={styles["container"]}>
      <div ref={textRef} className={styles["notifier"]}></div>
    </div>
  );
};

export default Notifier;
