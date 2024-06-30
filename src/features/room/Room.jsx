import React from "react";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import "../../global/styles/classes.scss";
import styles from "./Room.module.scss";
import useRoom from "./useRoom";

const Room = () => {
  const { onSend, onLeave, room, count, addAmount } = useRoom();

  return (
    <>
      <div className={`${styles["container"]} ${styles["flex-vertical"]}`}>
        <section className={styles["flex-vertical"]}>
          <h1 className={styles.text} style={{ fontSize: "30px" }}>
            Room details
          </h1>
          <p className={styles.text}>
            <span>{`Room id: ${room?.id}`}</span> <CopyButton value={room?.id} />
          </p>
          <p className={styles.text}>
            <span>{`Room status: ${room?.status}`}</span>
          </p>
          <p className={styles.text}>
            <span>{`Players: ${room?.players.map((player) => player.name)}`}</span>
          </p>
        </section>
        <section>
          <p className={styles.text}>
            <span>message counter: {count}</span>
          </p>
        </section>
        <section className={styles["flex-vertical"]}>
          <Button onClick={onSend}>+ {addAmount}</Button>
          <Button onClick={onLeave}>LEAVE ROOM</Button>
        </section>
      </div>
    </>
  );
};

export default Room;
