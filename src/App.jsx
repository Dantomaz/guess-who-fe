import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import TextPlugin from "gsap/TextPlugin";
import i18next from "i18next";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Provider, useDispatch } from "react-redux";
import "../src/translations/i18";
import styles from "./App.module.scss";
import DisconnectModal from "./features/disconnect/DisconnectModal";
import { setShowHints } from "./features/hints/hintsSlice";
import ReconnectProvider from "./features/reconnect/ReconnectProvider";
import Routing from "./features/routing/Routing";
import store from "./store";

gsap.registerPlugin(useGSAP, Flip, TextPlugin, Draggable);

const AppInit = () => {
  const dispatch = useDispatch();

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
};

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <div className={styles["background"]}></div>
        <div className={styles["background-image"]}></div>
        <Routing>
          <ReconnectProvider>
            <DisconnectModal />
            <AppInit />
          </ReconnectProvider>
        </Routing>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
