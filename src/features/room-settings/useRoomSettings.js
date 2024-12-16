import { useSelector } from "react-redux";
import { publishGameRestart, publishTeamsRandomize, publishTeamsReset } from "../api/apiRequest";

const useRoomSettings = ({ hidePanel }) => {
  const roomId = useSelector((state) => state.roomManager.room.id);

  const randomizeTeams = () => {
    publishTeamsRandomize({ roomId });
    hidePanel();
  };

  const resetTeams = () => {
    publishTeamsReset({ roomId });
    hidePanel();
  };

  const resetGame = () => {
    publishGameRestart({ roomId });
    hidePanel();
  };

  return { resetTeams, randomizeTeams, resetGame };
};

export default useRoomSettings;
