import { useDispatch } from "react-redux";
import { setShowHints } from "../hints/hintsSlice";

function useDashboard() {
  const dispatch = useDispatch();

  const toggleHints = (value) => {
    dispatch(setShowHints(value));
    localStorage.setItem("showHints", value);
  };

  return { toggleHints };
}

export default useDashboard;
