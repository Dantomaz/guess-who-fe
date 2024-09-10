import { preventDefaultAction } from "../../global/utils";

const useModal = ({ onBackdropClick }) => {
  const handleBackdropClick = (e) => {
    preventDefaultAction(e);
    onBackdropClick();
  };

  return { handleBackdropClick };
};

export default useModal;
