import React, { useRef } from "react";
import { MdManageAccounts, MdSupervisorAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import SlidingPanel from "../../global/components/sliding-panel/SlidingPanel";
import "../../global/styles/classes.scss";
import PlayerSettings from "../player-settings/PlayerSettings";
import RoomSettings from "../room-settings/RoomSettings";
import styles from "./Dashboard.module.scss";
import useDashboard from "./useDashboard";

function Dashboard() {
  const { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel } = useDashboard();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  return (
    <>
      <div className={styles["dashboard-bar"]}>
        <div className="flex">
          <Button ref={leftPanelRef} onClick={showLeftPanel}>
            Players {<MdSupervisorAccount fontSize={20} />} {Object.values(room.players).length}
          </Button>
        </div>
        <Button ref={rightPanelRef} onClick={showRightPanel}>
          {player?.name} {<MdManageAccounts fontSize={20} />}
        </Button>
      </div>
      <SlidingPanel linkRef={leftPanelRef} type="left" show={isLeftPanelShown} onClickOutsideCallback={hideLeftPanel}>
        <RoomSettings />
      </SlidingPanel>
      <SlidingPanel linkRef={rightPanelRef} type="right" show={isRightPanelShown} onClickOutsideCallback={hideRightPanel}>
        <PlayerSettings />
      </SlidingPanel>
    </>
  );
}

export default Dashboard;
