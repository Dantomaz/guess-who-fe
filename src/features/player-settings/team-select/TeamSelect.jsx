import React from "react";
import { useSelector } from "react-redux";
import useTeamSelect from "../team-select/useTeamSelect";
import styles from "./TeamSelect.module.scss";
import TeamSelectCard from "./TeamSelectCard";

const TeamSelect = () => {
  const { onTeamSelect } = useTeamSelect();
  const player = useSelector((state) => state.playerManager.player);
  const gameStatus = useSelector((state) => state.gameStateManager.gameState.status);

  const team = player?.team;
  const title = team === "NONE" ? "Join a team to play!" : "Change your team";

  const nameUpper = team === "RED" ? "NONE" : "RED";
  const nameLower = team === "BLUE" ? "NONE" : "BLUE";

  const textUpper = team === "RED" ? "No Team" : "Team Red";
  const textLower = team === "BLUE" ? "No Team" : "Team Blue";

  return (
    <div className={styles["container"]}>
      {
        <>
          <p>{title}</p>
          <div className={styles["team-select"]}>
            <TeamSelectCard name={nameUpper} text={textUpper} onClick={onTeamSelect} style={{ width: "11vw" }} disabled={gameStatus !== "NEW"} />
            <TeamSelectCard name={nameLower} text={textLower} onClick={onTeamSelect} style={{ width: "11vw" }} disabled={gameStatus !== "NEW"} />
          </div>
        </>
      }
    </div>
  );
};

export default TeamSelect;
