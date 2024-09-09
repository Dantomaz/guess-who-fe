import React from "react";
import Button from "../../global/components/button/Button";
import styles from "./TeamCard.module.scss";
import useTeamCard from "./useTeamCard";

const TeamCard = ({ children, team, title, ...rest }) => {
  const { teams, displaySwitchTeamButton, switchTeam } = useTeamCard({ team });
  const playerList = teams[team];

  return (
    <div className={`${styles["card"]} ${styles[team.toLowerCase()]}`} {...rest}>
      <div className={styles["players"]}>
        {playerList?.map((player) => (
          <div key={player.id} className={styles["player"]}>
            {player.name}
          </div>
        ))}
      </div>
      {displaySwitchTeamButton && <Button onClick={switchTeam}>Join team</Button>}
    </div>
  );
};

export default TeamCard;
