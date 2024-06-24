import React from "react";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import "../../global/styles/classes.scss";
import styles from "./Room.module.scss";
import useRoom from "./useRoom";

const Room = () => {
  const { onSend, onLeave, room, count, addAmount } = useRoom();

  return (
    <div className={`${styles["container"]} ${styles["flex-vertical"]}`}>
      <section className={styles["flex-vertical"]}>
        <h1>Room details</h1>
        <p>
          <span>{`Room id: ${room?.id}`}</span> <CopyButton value={room?.id} />
        </p>
        <p>
          <span>{`Room status: ${room?.status}`}</span>
        </p>
        <p>
          <span>{`Players: ${room?.players.map((player) => player.name)}`}</span>
        </p>
      </section>
      <section className={styles["flex-vertical"]}>
        <Button onClick={onSend}>+ {addAmount}</Button>
        <Button onClick={onLeave}>LEAVE ROOM</Button>
      </section>
      <section>
        <p>
          <span>message counter: {count}</span>
        </p>
      </section>
    </div>
  );
};

export default Room;
