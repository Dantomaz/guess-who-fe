import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global/styles/classes.scss";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    setTimeout(() => {
      redirect();
    }, 3000);
  });

  return (
    <div className={styles["page-background"]}>
      <div className={styles["page-text"]}>
        <p className={styles["title"]}>404 Page Not Found</p>
        <p className={styles["text"]}>Redirecting to title page...</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
