import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useStateUpdateHandler from "../../state/useStateUpdateHandler";
import styles from "./TeamSelect.module.scss";
import TeamSelectCard from "./TeamSelectCard";

const TeamSelect = () => {
  const { t } = useTranslation();
  const { switchTeam } = useStateUpdateHandler();
  const player = useSelector((state) => state.playerManager.player);
  const gameStatus = useSelector((state) => state.gameStateManager.gameState.gameStatus);

  const team = player?.team;
  const title = team === "NONE" ? t("player-settings.team-select.title-no-team") : t("player-settings.team-select.title");

  const nameUpper = team === "RED" ? "NONE" : "RED";
  const nameLower = team === "BLUE" ? "NONE" : "BLUE";

  const textUpper = team === "RED" ? t("player-settings.button.team-select.none") : t("player-settings.button.team-select.red");
  const textLower = team === "BLUE" ? t("player-settings.button.team-select.none") : t("player-settings.button.team-select.blue");

  return (
    <div className={styles["container"]}>
      {
        <>
          <p>{title}</p>
          <div className={styles["team-select"]}>
            <TeamSelectCard name={nameUpper} text={textUpper} onClick={switchTeam} style={{ width: "11vw" }} disabled={gameStatus !== "NEW"} />
            <TeamSelectCard name={nameLower} text={textLower} onClick={switchTeam} style={{ width: "11vw" }} disabled={gameStatus !== "NEW"} />
          </div>
        </>
      }
    </div>
  );
};

export default TeamSelect;
