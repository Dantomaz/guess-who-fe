import React, { useEffect } from "react";
import ActivityPanel from "../activity-panel/ActivityPanel";
import Board from "../board/Board";
import PickedCard from "../board/card/picked-card/PickedCard";
import Dashboard from "../dashboard/Dashboard";
import GameSettings from "../game-settings/GameSettings";
import Hints from "../hints/Hints";
import Notifier from "../notifier/Notifier";
import TeamCard from "../team/TeamCard";
import styles from "./Room.module.scss";
import useRoom from "./useRoom";

const Room = () => {
  const { gameStatus, displaySettings, displayBoard, displayChosenCard, resolveHintsContext } = useRoom();

  useEffect(() => {
    resolveHintsContext();
  }, [gameStatus, resolveHintsContext]);

  return (
    <div>
      <Dashboard />
      <Notifier />
      <div className={styles["container"]}>
        <TeamCard team="RED" />
        {displaySettings && <GameSettings />}
        {displayBoard && <Board />}
        <TeamCard team="BLUE" />
      </div>
      <PickedCard show={displayChosenCard} />
      <ActivityPanel />
      <Hints />
    </div>
  );
};

export default Room;
