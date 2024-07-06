import { FaCheck } from "react-icons/fa6";
import { MdOutlineContentCopy } from "react-icons/md";
import styles from "./CoppyButton.module.scss";
import useCoppyButton from "./useCoppyButton";

const CopyButton = ({ value, className, overrideClasses, ...rest }) => {
  const { copyToClipboard, recentlyCopied } = useCoppyButton();

  return (
    <button className={overrideClasses ? className : styles["copy-button"]} onClick={() => copyToClipboard(value)} {...rest}>
      {recentlyCopied ? (
        <>
          <FaCheck />
          copied
        </>
      ) : (
        <>
          <MdOutlineContentCopy />
          copy
        </>
      )}
    </button>
  );
};

export default CopyButton;
