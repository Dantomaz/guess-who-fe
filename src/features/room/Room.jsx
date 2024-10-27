import React from "react";
import { useSelector } from "react-redux";
import Board from "../board/Board";
import Dashboard from "../dashboard/Dashboard";
import GameSettings from "../game-settings/GameSettings";
import Notifier from "../notifier/Notifier";
import TeamCard from "../team/TeamCard";
import styles from "./Room.module.scss";

const Room = () => {
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const host = useSelector((state) => state.playerManager.player?.host);

  const displaySettings = gameState.gameStatus === "NEW" && host;
  const displayBoard = gameState.gameStatus !== "NEW";

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
    </div>
  );
};

export default Room;
