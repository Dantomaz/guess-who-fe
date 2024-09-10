import React from "react";
import Button from "../../global/components/button/Button";
import styles from "./TeamCard.module.scss";
import useTeamCard from "./useTeamCard";

const TeamCard = ({ children, team, title, ...rest }) => {
  const {
    playersInTeam,
    numberOfVoters,
    numberOfAllPlayers,
    displayEndVotingButton,
    notEveryoneVoted,
    startGame,
    displayEndTurnButton,
    endTurn,
    displaySwitchTeamButton,
    switchTeam,
  } = useTeamCard({ team });

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
      {displayEndVotingButton && (
        <Button className={styles["button-end-voting"]} onClick={startGame} disabled={notEveryoneVoted}>
          End voting ({numberOfVoters}/{numberOfAllPlayers})
        </Button>
      )}
      {displayEndTurnButton && <Button onClick={endTurn}>End turn</Button>}
      {displaySwitchTeamButton && <Button onClick={switchTeam}>Join team</Button>}
    </div>
  );
};

export default TeamCard;
