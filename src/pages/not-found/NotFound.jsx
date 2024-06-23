import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../global/styles/classes.scss";
import styles from "./NotFound.module.scss";

function NotFound() {
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
        <h4>Redirecting to landing page...</h4>
      </span>
    </div>
  );
}

export default NotFound;
