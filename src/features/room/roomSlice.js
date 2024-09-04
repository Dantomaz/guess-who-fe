import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {
    id: null,
    players: [],
    images: {},
  },
};

export const roomSlice = createSlice({
  name: "roomManager",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      console.log("setRoom dispatched: ", action.payload);
      state.room = action.payload;
    },
    resetRoom: (state) => {
      state.room = initialState.room;
    },
    setPlayers: (state, action) => {
      console.log("setPlayers dispatched: ", action.payload);
      state.room.players = action.payload;
    },
    setImages: (state, action) => {
      console.log("setImages dispatched: ", action.payload);
      state.room.images = action.payload;
    },
  },
});

export const { setRoom, resetRoom, setPlayers, setImages } = roomSlice.actions;

export default roomSlice.reducer;
