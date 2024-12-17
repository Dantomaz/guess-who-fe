import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdManageAccounts, MdSupervisorAccount } from "react-icons/md";
import { useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import Button from "../../global/components/button/Button";
import SlidingPanel from "../../global/components/sliding-panel/SlidingPanel";
import "../../global/styles/classes.scss";
import PlayerSettings from "../player-settings/PlayerSettings";
import RoomSettings from "../room-settings/RoomSettings";
import styles from "./Dashboard.module.scss";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const { t } = useTranslation();
  const { toggleHints } = useDashboard();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);
  const showHints = useSelector((state) => state.hintsManager.showHints);
  const { value: isLeftPanelShown, setTrue: showLeftPanel, setFalse: hideLeftPanel } = useBoolean();
  const { value: isRightPanelShown, setTrue: showRightPanel, setFalse: hideRightPanel } = useBoolean();
  const leftPanelRef = useRef();
  const rightPanelRef = useRef();

  return (
    <>
      <div className={styles["dashboard-bar"]}>
        <div className="flex">
          <Button ref={leftPanelRef} onClick={showLeftPanel}>
            {t("dashboard.button.players")}
            <div className={styles["icon-wrapper"]}>
              {<MdSupervisorAccount />} {Object.values(room.players).length}
            </div>
          </Button>
        </div>
        <div className={styles["button-group"]}>
          <Button onClick={() => toggleHints(!showHints)}>{`${
            showHints ? t("dashboard.button.hide-hints") : t("dashboard.button.show-hints")
          }`}</Button>
          <Button ref={rightPanelRef} onClick={showRightPanel}>
            {player?.name} {<MdManageAccounts />}
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
