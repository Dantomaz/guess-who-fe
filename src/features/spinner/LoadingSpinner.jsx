import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return <img src="./loading-spinner.svg" alt="loading spinner" className={styles["svg"]} />;
};

export default LoadingSpinner;
