import { useDispatch } from "react-redux";
import { setShowHints } from "../hints/hintsSlice";

function useDashboard() {
  const dispatch = useDispatch();

  const toggleHints = (value) => {
    dispatch(setShowHints(value));
  };

  return { toggleHints };
}

export default useDashboard;
