import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import CopyButton from "../../global/components/copy-button/CopyButton";
import PlayerButton from "./PlayerButton/PlayerButton";
import styles from "./RoomSettings.module.scss";
import useRoomSettings from "./useRoomSettings";

const RoomSettings = ({ hidePanel }) => {
  const { t } = useTranslation();
  const { resetGame } = useRoomSettings({ hidePanel });
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const numberOfPlayers = Object.values(room?.players).length;

  return (
    <div className={styles["container"]}>
      <div className={styles["connect-info"]}>
        <p className={styles["invite-text"]}>{t("room-settings.code.title")}</p>
        <p className={styles["room-code"]}>
          <span className={styles["room-id"]}>{room?.id}</span> <CopyButton value={room?.id} />
        </p>
      </div>
      <div className={styles["settings"]}>
        <section className={styles["section"]}>
          {player.host && (
            <Button className={styles["button-reset"]} onClick={resetGame}>
              {t("room-settings.button.reset-game")}
            </Button>
          )}
          <p style={{ fontWeight: 700 }}>{t("room-settings.player-list.title", { count: numberOfPlayers })}</p>
          <div className={styles["players"]}>
            {Object.values(room.players).map((player, index) => (
              <PlayerButton player={player} key={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RoomSettings;
