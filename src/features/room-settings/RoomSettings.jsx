import React from "react";
import { BiSolidCrown } from "react-icons/bi";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import styles from "./RoomSettings.module.scss";
import useRoomSettings from "./useRoomSettings";

const RoomSettings = () => {
  const { playersNumber, chooseFunnyText, resetGame } = useRoomSettings();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  return (
    <>
      <div className={styles["connect-info"]}>
        <p className={styles["invite-text"]}>Friends can join you using this code!</p>
        <p className={styles["room-code"]}>
          <span className={styles["room-id"]}>{room?.id}</span> <CopyButton value={room?.id} />
        </p>
      </div>
      <div className={styles["settings"]}>
        <section className={styles["section"]}>
          {player.host && (
            <Button className={styles["button-reset"]} onClick={resetGame}>
              Reset game
            </Button>
          )}
          <p style={{ fontWeight: 700 }}>
            Players in this room:<span className={styles["players-number"]}>{playersNumber}</span>
          </p>
          <p>{chooseFunnyText(playersNumber)}</p>
          <div style={{ marginTop: "1vh" }}>
            {Object.values(room.players).map((player, index) => (
              <div key={index}>
                {player.name}
                {player.host && <BiSolidCrown fontSize={14} style={{ marginLeft: "0.25vw", marginBottom: "-0.2vh" }} />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default RoomSettings;
