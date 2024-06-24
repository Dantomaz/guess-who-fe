import { Provider } from "react-redux";
import { WebSocketClientProvider } from "./features/api/web-socket/WebSocketClientProvider";
import Routing from "./features/routing/Routing";
import store from "./store";

const App = () => {
  return (
    <WebSocketClientProvider>
      <Provider store={store}>
        <Routing />
      </Provider>
    </WebSocketClientProvider>
  );
};

export default App;
