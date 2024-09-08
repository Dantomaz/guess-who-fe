import React from "react";
import styles from "./TeamCard.module.scss";
import useTeam from "./useTeam";

const TeamCard = ({ children, team, title, ...rest }) => {
  const { teams } = useTeam();
  const playerList = teams[team.toUpperCase()];

  return (
    <div className={`${styles["card"]} ${styles[team]}`} {...rest}>
      <div className={styles["players"]}>
        {playerList?.map((player) => (
          <div key={player.id} className={styles["player"]}>
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
