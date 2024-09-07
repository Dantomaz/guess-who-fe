import React, { useRef } from "react";
import { MdManageAccounts, MdSupervisorAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import Button from "../../global/components/button/Button";
import SlidingPanel from "../../global/components/sliding-panel/SlidingPanel";
import "../../global/styles/classes.scss";
import { didSomeoneNotVote } from "../../global/utils";
import PlayerSettings from "../player-settings/PlayerSettings";
import RoomSettings from "../room-settings/RoomSettings";
import styles from "./Dashboard.module.scss";
import useDashboard from "./useDashboard";

const Dashboard = ({ startGame }) => {
  const { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel } = useDashboard();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const gameState = useSelector((state) => state.gameStateManager.gameState);
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  return (
    <>
      <div className={styles["dashboard-bar"]}>
        <div className="flex">
          <Button ref={leftPanelRef} onClick={showLeftPanel}>
            Players {<MdSupervisorAccount fontSize={24} style={{ marginRight: "0.2vw" }} />} {Object.values(room.players).length}
          </Button>
        </div>
        <div className={styles["button-group"]}>
          {gameState.status === "VOTING" && player.host && (
            <Button
              className={styles["button-end-voting"]}
              onClick={startGame}
              disabled={didSomeoneNotVote(room.players, gameState.votesBlue, gameState.votesRed)}
            >
              End voting
            </Button>
          )}
          {gameState.status === "IN_PROGRESS" && <div>GAME STARTED</div>}
          <Button ref={rightPanelRef} onClick={showRightPanel}>
            {player?.name} {<MdManageAccounts fontSize={20} />}
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
