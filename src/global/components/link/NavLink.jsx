import { NavLink as NavLinkReact } from "react-router-dom";
import styles from "./NavLink.module.scss";

const NavLink = ({ children, ...rest }) => {
  return (
    <NavLinkReact className={styles.link} {...rest}>
      {children}
    </NavLinkReact>
  );
};

export default NavLink;
