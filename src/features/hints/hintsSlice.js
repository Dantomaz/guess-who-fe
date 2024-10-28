import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHints: true,
  context: "default", // 2 options are possible: default (for regular board view) or preview (for image preview)
};

export const hintsSlice = createSlice({
  name: "hintsManager",
  initialState,
  reducers: {
    toggleHints: (state) => {
      state.showHints = !state.showHints;
    },
    hintsContextDefault: (state) => {
      state.context = "default";
    },
    hintsContextPreview: (state) => {
      state.context = "preview";
    },
  },
});

export const { toggleHints, hintsContextDefault, hintsContextPreview } = hintsSlice.actions;

export default hintsSlice.reducer;
