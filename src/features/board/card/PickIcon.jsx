import { BsHandIndexThumb } from "react-icons/bs";
import Button from "../../../global/components/button/Button";
import styles from "./PickIcon.module.scss";

const PickIcon = ({ onClick, disable }) => {
  return (
    <Button overrideClasses className={styles["pick-icon"]} onClick={onClick} disable={disable}>
      <BsHandIndexThumb />
    </Button>
  );
};

export default PickIcon;
