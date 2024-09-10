import { BsHandIndexThumb } from "react-icons/bs";
import Button from "../../../global/components/button/Button";
import styles from "./PickIcon.module.scss";

const PickIcon = ({ active, onClick }) => {
  return (
    <Button overrideClasses className={`${styles["pick-icon"]} ${active && styles["active"]}`} onClick={onClick}>
      <BsHandIndexThumb />
    </Button>
  );
};

export default PickIcon;
