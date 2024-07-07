import React from "react";
import "../../global/styles/classes.scss";
import Dashboard from "../dashboard/Dashboard";
import styles from "./Room.module.scss";

const Room = () => {
  return (
    <>
      <Dashboard />
      <div className={`${styles["container"]}`}></div>
    </>
  );
};

export default Room;
