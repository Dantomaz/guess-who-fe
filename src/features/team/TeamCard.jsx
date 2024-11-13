import React from "react";
import Button from "../../global/components/button/Button";
import useStateUpdateHandler from "../state/useStateUpdateHandler";
import styles from "./TeamCard.module.scss";
import useTeamCard from "./useTeamCard";

const TeamCard = ({ children, team, title, ...rest }) => {
  const { switchTeam } = useStateUpdateHandler();
  const { playersInTeam, displayEndTurnButton, endTurn, displaySwitchTeamButton } = useTeamCard({ team });

  return (
    <div className={`${styles["card"]} ${styles[team.toLowerCase()]}`} {...rest}>
      <div className={styles["players"]}>
        {playersInTeam &&
          playersInTeam.map((player) => (
            <div key={player.id} className={styles["player"]}>
              {player.name}
            </div>
          ))}
      </div>
      {displayEndTurnButton && <Button onClick={endTurn}>End turn</Button>}
      {displaySwitchTeamButton && <Button onClick={() => switchTeam(team)}>Join team</Button>}
    </div>
  );
};

export default TeamCard;
