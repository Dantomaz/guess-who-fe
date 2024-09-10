import { createPortal } from "react-dom";
import { preventDefaultAction } from "../../global/utils";
import styles from "./Modal.module.scss";
import useModal from "./useModal";

const Modal = ({ onBackdropClick, children }) => {
  const { handleBackdropClick } = useModal({ onBackdropClick });

  return createPortal(
    <div className={styles["modal-backdrop"]} onClick={handleBackdropClick} onContextMenu={handleBackdropClick}>
      <div className={styles["modal-container"]} onClick={preventDefaultAction}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
