import "../../global/styles/classes.scss";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles["page-background"]}>
      <div className={styles["page-text"]}>
        <p className={styles["title"]}>404 Page Not Found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
