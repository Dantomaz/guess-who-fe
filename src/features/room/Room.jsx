import React from "react";
import { useSelector } from "react-redux";
import Board from "../board/Board";
import Dashboard from "../dashboard/Dashboard";
import GameSettings from "../game-settings/GameSettings";
import TeamCard from "../team/TeamCard";
import styles from "./Room.module.scss";

const Room = () => {
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const host = useSelector((state) => state.playerManager.player?.host);

  return (
    <>
      <Dashboard />
      <div className={styles["container"]}>
        <TeamCard team="red" />
        {gameState.status === "NEW" && host && <GameSettings />}
        {gameState.status !== "NEW" && <Board />}
        <TeamCard team="blue" />
      </div>
    </>
  );
};

export default Room;
