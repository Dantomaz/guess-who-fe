import styles from "./Voters.module.scss";

const Voters = ({ voters }) => {
  return (
    <div className={styles["voters"]}>
      {voters?.map((player, index) => (
        <div key={index} className={`${styles["voter"]} ${styles[player.team.toLowerCase()]}`}>
          {player.name}
        </div>
      ))}
    </div>
  );
};

export default Voters;
