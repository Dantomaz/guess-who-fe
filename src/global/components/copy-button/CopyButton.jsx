import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./CoppyButton.module.scss";
import useCoppyButton from "./useCoppyButton";

const CopyButton = ({ value, className, overrideClasses, ...rest }) => {
  const { t } = useTranslation();
  const { copyToClipboard, recentlyCopied } = useCoppyButton();

  return (
    <button className={overrideClasses ? className : styles["copy-button"]} onClick={() => copyToClipboard(value)} {...rest}>
      {recentlyCopied ? (
        <>
          <FaCheck />
          {t("room-settings.button.copy.clicked")}
        </>
      ) : (
        <>
          <MdOutlineContentCopy />
          {t("room-settings.button.copy.default")}
        </>
      )}
    </button>
  );
};

export default CopyButton;
