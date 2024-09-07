import { useSelector } from "react-redux";
import { publishGameStart } from "../api/apiRequest";

const useRoom = () => {
  const roomId = useSelector((state) => state.roomManager.room.id);

  const startGame = () => {
    publishGameStart({ roomId });
  };

  return { startGame };
};

export default useRoom;
