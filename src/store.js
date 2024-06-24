import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player/playerSlice";
import countReducer from "./features/room/counterSlice";
import roomReducer from "./features/room/roomSlice";

const store = configureStore({
  reducer: {
    roomManager: roomReducer,
    playerManager: playerReducer,
    counter: countReducer,
  },
});

export default store;
