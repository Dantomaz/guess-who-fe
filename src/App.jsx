import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import TextPlugin from "gsap/TextPlugin";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setShowHints } from "./features/hints/hintsSlice";
import ReconnectProvider from "./features/reconnect/ReconnectProvider";
import Routing from "./features/routing/Routing";
import TimeoutModal from "./features/timeout/TimeoutModal";
import store from "./store";

gsap.registerPlugin(useGSAP, Flip, TextPlugin, Draggable);

const AppInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const showHintsBoolean = JSON.parse(localStorage.getItem("showHints"));
    dispatch(setShowHints(showHintsBoolean));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

const App = () => {
  return (
    <Provider store={store}>
      <Routing>
        <ReconnectProvider>
          <TimeoutModal />
          <AppInit />
        </ReconnectProvider>
      </Routing>
    </Provider>
  );
};

export default App;
