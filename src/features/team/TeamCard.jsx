import React from "react";
import styles from "./TeamCard.module.scss";
import useTeam from "./useTeam";

const TeamCard = ({ children, name, title, ...rest }) => {
  const { teams } = useTeam();
  const playerList = teams[name.toUpperCase()];

  const classColor = styles[name];
  const classes = `${styles["card"]} ${classColor}`;

  return (
    <div className={classes} {...rest}>
      <div className={styles["players"]}>{playerList?.map((player) => player.name)}</div>
    </div>
  );
};

export default TeamCard;
