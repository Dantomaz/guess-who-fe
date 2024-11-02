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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reconnect = () => {
    requestRoomReconnect()
      .then((response) => reenterRoom(response.data.room, response.data.player))
      .then(() => navigate("/room"))
      .catch(() => navigate("/"));
  };

  return <ReconnectContext.Provider value={null}>{children}</ReconnectContext.Provider>;
};

export default ReconnectProvider;

export const useReconnect = () => {
  return useContext(ReconnectContext);
};
