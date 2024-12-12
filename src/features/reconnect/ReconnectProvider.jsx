import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestRoomReconnect } from "../api/apiRequest";
import useStateUpdateHandler from "../state/useStateUpdateHandler";

const ReconnectContext = createContext();

const ReconnectProvider = ({ children }) => {
  const navigate = useNavigate();
  const { reenterRoom } = useStateUpdateHandler();

  useEffect(() => {
    reconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reconnect = () => {
    const roomId = localStorage.getItem("roomId");
    const playerId = localStorage.getItem("playerId");

    if (!roomId || !playerId) {
      navigate("/");
      return;
    }

    requestRoomReconnect({ roomId, playerId })
      .then((response) => reenterRoom(response.data.room, response.data.player))
      .then(() => navigate("/room"))
      .catch(() => {
        localStorage.removeItem("roomId");
        localStorage.removeItem("playerId");
        navigate("/");
      });
  };

  return <ReconnectContext.Provider value={null}>{children}</ReconnectContext.Provider>;
};

export default ReconnectProvider;

export const useReconnect = () => {
  return useContext(ReconnectContext);
};
