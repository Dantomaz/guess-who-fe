import React from "react";
import "../../global/styles/classes.scss";
import Dashboard from "../dashboard/Dashboard";
import TeamCard from "../team/TeamCard";
import styles from "./Room.module.scss";

const Room = () => {
  return (
    <>
      <Dashboard />
      <div className={`${styles["container"]}`}>
        <TeamCard name="red" />
        <TeamCard name="blue" />
      </div>
    </>
  );
};

export default Room;
