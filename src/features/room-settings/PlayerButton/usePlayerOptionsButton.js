import { useSelector } from "react-redux";
import { publishPlayerKick, publishPlayerMakeHost } from "../../api/apiRequest";

const usePlayerOptionsButton = ({ onClose }) => {
  const roomId = useSelector((state) => state.roomManager.room.id);
  const isHost = useSelector((state) => state.playerManager.player.host);

  const makeHost = (playerId) => {
    if (!isHost) {
      return;
    }
    publishPlayerMakeHost({ roomId, playerId });
    onClose();
  };

  const kickPlayer = (playerId) => {
    if (!isHost) {
      return;
    }
    publishPlayerKick({ roomId, playerId });
    onClose();
  };

  return { makeHost, kickPlayer };
};

export default usePlayerOptionsButton;
