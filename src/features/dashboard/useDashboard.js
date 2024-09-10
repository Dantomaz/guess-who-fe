import { useBoolean } from "usehooks-ts";

function useDashboard() {
  const { value: isLeftPanelShown, setTrue: showLeftPanel, setFalse: hideLeftPanel } = useBoolean();
  const { value: isRightPanelShown, setTrue: showRightPanel, setFalse: hideRightPanel } = useBoolean();

  return { isLeftPanelShown, showLeftPanel, hideLeftPanel, isRightPanelShown, showRightPanel, hideRightPanel };
}

export default useDashboard;
