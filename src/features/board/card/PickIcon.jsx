import { BsHandIndexThumb } from "react-icons/bs";
import Button from "../../../global/components/button/Button";
import styles from "./PickIcon.module.scss";

const PickIcon = ({ onClick }) => {
  return (
    <Button overrideClasses className={styles["pick-icon"]} onClick={onClick}>
      <BsHandIndexThumb />
    </Button>
  );
};

export default PickIcon;
