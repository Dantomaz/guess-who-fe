import React from "react";
import { useSelector } from "react-redux";
import useTeam from "../../team/useTeam";
import styles from "./TeamSelect.module.scss";
import TeamSelectCard from "./TeamSelectCard";

const TeamSelect = () => {
  const { onTeamSelect } = useTeam();
  const player = useSelector((state) => state.playerManager.player);
  const gameStatus = useSelector((state) => state.gameStateManager.gameState.status);

  const team = player?.team?.toLowerCase();
  const title = team === "spectators" ? "Join a team to play!" : "Change your team";
  const nameUpper = team === "red" ? "spectators" : "red";
  const nameLower = team === "blue" ? "spectators" : "blue";
  const textUpper = team === "red" ? "Spectators" : "Team Red";
  const textLower = team === "blue" ? "Spectators" : "Team Blue";

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
