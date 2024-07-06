import React from "react";
import Button from "../../global/components/button/Button";
import "../../global/styles/classes.scss";
import Dashboard from "../dashboard/Dashboard";
import styles from "./Room.module.scss";
import useRoom from "./useRoom";

const Room = () => {
  const { onSend, count, addAmount } = useRoom();

  return (
    <>
      <Dashboard />
      <div className={`${styles["container"]} ${styles["flex-vertical"]}`}>
        <div className={styles["flex-vertical"]}>
          <h1 className={styles.text} style={{ fontSize: "30px" }}>
            Room details
          </h1>
        </div>
        <div>
          <p className={styles.text}>
            <span>message counter: {count}</span>
          </p>
        </div>
        <div className={styles["flex-vertical"]}>
          <Button onClick={onSend}>+ {addAmount}</Button>
        </div>
      </div>
    </>
  );
};

export default Room;
