import React, { useRef } from "react";
import { MdManageAccounts, MdSupervisorAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import SlidingPanel from "../../global/components/sliding-panel/SlidingPanel";
import "../../global/styles/classes.scss";
import { toggleHints } from "../hints/hintsSlice";
import PlayerSettings from "../player-settings/PlayerSettings";
import RoomSettings from "../room-settings/RoomSettings";
import styles from "./Dashboard.module.scss";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel } = useDashboard();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const showHints = useSelector((state) => state.hintsManager.showHints);
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  return (
    <>
      <div className={styles["dashboard-bar"]}>
        <div className="flex">
          <Button ref={leftPanelRef} onClick={showLeftPanel}>
            Players {<MdSupervisorAccount fontSize={"2.6vh"} style={{ marginRight: "0.2vw" }} />} {Object.values(room.players).length}
          </Button>
        </div>
        <div className={styles["button-group"]}>
          <Button onClick={() => dispatch(toggleHints())}>{`${showHints ? "Hide" : "Show"} hints`}</Button>
          <Button ref={rightPanelRef} onClick={showRightPanel}>
            {player?.name} {<MdManageAccounts fontSize={"2.2vh"} />}
          </Button>
        </div>
      </div>
      <SlidingPanel linkRef={leftPanelRef} type="left" show={isLeftPanelShown} onClickOutsideCallback={hideLeftPanel}>
        <RoomSettings hidePanel={hideLeftPanel} />
      </SlidingPanel>
      <SlidingPanel linkRef={rightPanelRef} type="right" show={isRightPanelShown} onClickOutsideCallback={hideRightPanel}>
        <PlayerSettings hidePanel={hideRightPanel} />
      </SlidingPanel>
    </>
  );
};

export default Dashboard;
