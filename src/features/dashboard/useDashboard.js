import { useDispatch } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { setShowHints } from "../hints/hintsSlice";

function useDashboard() {
  const { value: isLeftPanelShown, setTrue: showLeftPanel, setFalse: hideLeftPanel } = useBoolean();
  const { value: isRightPanelShown, setTrue: showRightPanel, setFalse: hideRightPanel } = useBoolean();
  const dispatch = useDispatch();

  const toggleHints = (value) => {
    dispatch(setShowHints(value));
    localStorage.setItem("showHints", value);
  };

  return { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel, toggleHints };
}

export default useDashboard;
