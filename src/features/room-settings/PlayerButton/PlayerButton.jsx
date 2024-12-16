import { useRef } from "react";
import { BiSolidCrown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import styles from "./PlayerButton.module.scss";
import PlayerOptions from "./PlayerOptions";
import StatusIcon from "./StatusIcon";

const PlayerButton = ({ player }) => {
  const currentPlayer = useSelector((state) => state.playerManager.player);
  const { value: areOptionsOpened, setTrue: openOptions, setFalse: closeOptions } = useBoolean();
  const playerRef = useRef();

  const canDisplayOptions = currentPlayer.host && currentPlayer.id !== player.id && !areOptionsOpened;

  const handleOpenOptions = () => {
    if (canDisplayOptions) {
      openOptions();
    }
  };

  return (
    <div className={styles["container"]}>
      <StatusIcon player={player} />
      <div
        ref={playerRef}
        className={`${styles["player-name"]} ${canDisplayOptions && styles["player-name-interactible"]}`}
        onClick={handleOpenOptions}
      >
        {player.name}
        {player.host && <BiSolidCrown />}
        <PlayerOptions player={player} show={areOptionsOpened} onClickOutsideCallback={closeOptions} />
      </div>
    </div>
  );
};

export default PlayerButton;
