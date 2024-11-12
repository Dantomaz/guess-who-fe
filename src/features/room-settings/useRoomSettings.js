import { useSelector } from "react-redux";
import { publishGameRestart } from "../api/apiRequest";

const useRoomSettings = ({ hidePanel }) => {
  const roomId = useSelector((state) => state.roomManager.room.id);

  const resetGame = () => {
    publishGameRestart({ roomId });
    hidePanel();
  };

  return { resetGame };
};

export default useRoomSettings;
