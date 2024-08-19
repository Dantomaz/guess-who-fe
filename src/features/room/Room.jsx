import React from "react";
import Dashboard from "../dashboard/Dashboard";
import GameSettings from "../game-settings/GameSettings";
import TeamCard from "../team/TeamCard";
import styles from "./Room.module.scss";

const Room = () => {
  return (
    <>
      <Dashboard />
      <div className={`${styles["container"]}`}>
        <TeamCard name="red" />
        <GameSettings />
        <TeamCard name="blue" />
      </div>
    </>
  );
};

export default Room;
