import React from "react";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import PlayerButton from "./PlayerButton/PlayerButton";
import styles from "./RoomSettings.module.scss";
import useRoomSettings from "./useRoomSettings";

const RoomSettings = ({ hidePanel }) => {
  const { resetGame } = useRoomSettings({ hidePanel });
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const numberOfPlayers = Object.values(room?.players).length;

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
            Players in this room:<span className={styles["players-number"]}>{numberOfPlayers}</span>
          </p>
          <div className={styles["players"]}>
            {Object.values(room.players).map((player, index) => (
              <PlayerButton player={player} key={index} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default RoomSettings;
