import { Provider } from "react-redux";
import Routing from "./features/routing/Routing";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App;
