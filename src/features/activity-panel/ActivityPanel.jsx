import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styles from "./ActivityPanel.module.scss";

const ActivityPanel = () => {
  const { t } = useTranslation();
  const activityHistory = useSelector((state) => state.gameStateManager.gameState.activityHistory);
  const logRef = useRef();

  useEffect(() => {
    logRef.current.scrollTop = logRef.current?.scrollHeight;
  }, [activityHistory]);

  const createActivityRow = (activity, index) => {
    const player = activity.player;
    const playerTeam = player.team.toLowerCase();

    const playerNameElement = <span className={styles[playerTeam]}>{player.name}</span>;
    let textElement;

    if (activity.type === "END_TURN") {
      textElement = t("activity-panel.message.end-turn");
    } else if (activity.type === "GUESS_CARD") {
      const cardNumberElement = <span className={styles["card-number"]}>{activity.cardNumber}</span>;
      textElement = (
        <>
          {t("activity-panel.message.guess-card")}
          {cardNumberElement}
        </>
      );
    }

    const fullMessage = (
      <>
        {playerNameElement}
        {textElement}
      </>
    );

    return (
      <div className={`${styles["activity-row"]} ${styles[`background-${playerTeam}`]}`} key={index}>
        {fullMessage}
      </div>
    );
  };

  return (
    <div className={`${styles["card"]} ${activityHistory?.length > 0 || styles["card-empty"]}`}>
      <div className={styles["header"]}>{t("activity-panel.header")}</div>
      <div ref={logRef} className={styles["content"]}>
        {activityHistory?.map(createActivityRow)}
      </div>
    </div>
  );
};

export default ActivityPanel;
