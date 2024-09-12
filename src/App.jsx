import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import TextPlugin from "gsap/TextPlugin";
import { Provider } from "react-redux";
import Routing from "./features/routing/Routing";
import store from "./store";

gsap.registerPlugin(useGSAP, Flip, TextPlugin);

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
