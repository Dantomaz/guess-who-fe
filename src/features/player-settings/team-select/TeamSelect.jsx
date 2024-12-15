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
  let title;

  if (gameStatus !== "NEW") {
    title = t("player-settings.team-select.title-change-blocked");
  } else if (team === "NONE") {
    title = t("player-settings.team-select.title-no-team");
  } else {
    title = t("player-settings.team-select.title");
  }

  const nameUpper = team === "RED" ? "NONE" : "RED";
  const nameLower = team === "BLUE" ? "NONE" : "BLUE";

  const textUpper = team === "RED" ? t("player-settings.button.team-select.none") : t("player-settings.button.team-select.red");
  const textLower = team === "BLUE" ? t("player-settings.button.team-select.none") : t("player-settings.button.team-select.blue");

  return (
    <div className={styles["container"]}>
      {title}
      <div className={styles["team-select"]}>
        <TeamSelectCard name={nameUpper} text={textUpper} onClick={switchTeam} disabled={gameStatus !== "NEW"} />
        <TeamSelectCard name={nameLower} text={textLower} onClick={switchTeam} disabled={gameStatus !== "NEW"} />
      </div>
    </div>
  );
};

export default TeamSelect;
