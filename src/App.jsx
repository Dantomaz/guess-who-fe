import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/translations/i18";
import styles from "./App.module.scss";
import { setShowHints } from "./features/hints/hintsSlice";

const App = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.gameStateManager.gameState);

  useEffect(() => {
    const showHintsBoolean = JSON.parse(localStorage.getItem("showHints"));
    dispatch(setShowHints(showHintsBoolean));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.trace = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
  }

  const backgroundColor = useMemo(() => {
    switch (gameState.currentTurn) {
      case "RED":
        return styles["background-red"];
      case "BLUE":
        return styles["background-blue"];
      default:
        return styles["background-default"];
    }
  }, [gameState.currentTurn]);

  return (
    <>
      <div className={`${styles["background"]} ${backgroundColor}`}></div>
      <div className={styles["background-image"]}></div>
    </>
  );
};

export default App;
