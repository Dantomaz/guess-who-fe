import React from "react";
import { BiSolidCrown } from "react-icons/bi";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import { findHost } from "../../global/utils";
import styles from "./RoomSettings.module.scss";
import useRoomSettings from "./useRoomSettings";

const RoomSettings = () => {
  const { playersNumber, chooseFunnyText } = useRoomSettings();
  const room = useSelector((state) => state.roomManager.room);
  const host = findHost(room);

  return (
    <>
      <div className={styles["connect-info"]}>
        <p className={styles["invite-text"]}>Friends can join you using this code!</p>
        <p className={styles["room-code"]}>
          <span className={styles["room-id"]}>{room?.id}</span> <CopyButton value={room?.id} />
        </p>
      </div>
      <div className={styles["settings"]}>
        <Button className={styles["host-label"]}>
          {host?.name} <BiSolidCrown fontSize={12} />
        </Button>
        <p style={{ fontWeight: 700 }}>
          Players in this room:<span className={styles["players-number"]}>{playersNumber}</span>
        </p>
        <p>{Object.values(room.players).map((player) => `${player.name} `)}</p>
        <p>{chooseFunnyText(playersNumber)}</p>
      </div>
    </>
  );
};

export default RoomSettings;
