import styles from "./StatusIcon.module.scss";

const StatusIcon = ({ player }) => {
  const color = player.connected ? styles["connected"] : styles["disconnected"];

  return <div className={`${styles["circle"]} ${color}`}></div>;
};

export default StatusIcon;
