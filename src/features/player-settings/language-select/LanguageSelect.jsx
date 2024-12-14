import { useTranslation } from "react-i18next";
import pl from "../../../assets/pl.svg";
import en from "../../../assets/us.svg";
import styles from "./LanguageSelect.module.scss";

const LanguageSelect = () => {
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <div className={styles["container"]}>
      <img src={en} alt="en language" onClick={() => handleLanguageChange("en")} />
      <img src={pl} alt="pl language" onClick={() => handleLanguageChange("pl")} />
    </div>
  );
};

export default LanguageSelect;
