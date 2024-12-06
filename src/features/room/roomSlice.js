import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    players: {},
    images: null,
  },
};

export const roomSlice = createSlice({
  name: "roomManager",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      console.log("setRoom dispatched:", action.payload);
      state.room = action.payload;
    },
    resetRoom: (state) => {
      state.room = initialState.room;
    },
    setPlayers: (state, action) => {
      state.room.players = action.payload;
    },
    setImages: (state, action) => {
      state.room.images = action.payload;
    },
  },
});

export const { setRoom, resetRoom, setPlayers, setImages } = roomSlice.actions;

export default roomSlice.reducer;
