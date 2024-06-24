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
      <span className={styles["page-text"]}>
        <h1>404 Page Not Found</h1>
        <h4>Redirecting to title page...</h4>
      </span>
    </div>
  );
}

export default NotFoundPage;
