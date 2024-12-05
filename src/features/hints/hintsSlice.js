import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHints: true,
  context: "new",
};

export const hintsSlice = createSlice({
  name: "hintsManager",
  initialState,
  reducers: {
    setShowHints: (state, action) => {
      state.showHints = action.payload;
    },
    hintsContextNew: (state) => {
      state.context = "new";
    },
    hintsContextVoting: (state) => {
      state.context = "voting";
    },
    hintsContextInProgress: (state) => {
      state.context = "inProgress";
    },
    hintsContextFinished: (state) => {
      state.context = "finished";
    },
    hintsContextPreview: (state) => {
      state.context = "preview";
    },
  },
});

export const { setShowHints, hintsContextNew, hintsContextVoting, hintsContextInProgress, hintsContextFinished, hintsContextPreview } =
  hintsSlice.actions;

export default hintsSlice.reducer;
