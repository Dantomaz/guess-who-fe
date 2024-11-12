import { configureStore } from "@reduxjs/toolkit";
import disconnectReducer from "./features/disconnect/disconnectSlice";
import gameStateReducer from "./features/game-state/gameStateSlice";
import hintsReducer from "./features/hints/hintsSlice";
import playerReducer from "./features/player/playerSlice";
import roomReducer from "./features/room/roomSlice";

const store = configureStore({
  reducer: {
    roomManager: roomReducer,
    playerManager: playerReducer,
    gameStateManager: gameStateReducer,
    hintsManager: hintsReducer,
    disconnectNotifier: disconnectReducer,
  },
});

export default store;
