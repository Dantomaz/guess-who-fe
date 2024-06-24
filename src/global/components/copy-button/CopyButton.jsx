import { FaCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./CoppyButton.module.scss";
import useCoppyButton from "./useCoppyButton";

const CopyButton = ({ value, ...rest }) => {
  const { copyToClipboard, recentlyCopied } = useCoppyButton();

  return (
    <button className={styles["copy-button"]} onClick={() => copyToClipboard(value)} {...rest}>
      {recentlyCopied ? (
        <>
          <FaCheck />copied
        </>
      ) : (
        <>
          <MdOutlineContentCopy />copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
