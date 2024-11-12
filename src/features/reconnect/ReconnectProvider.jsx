import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestRoomReconnect } from "../api/apiRequest";
import useStateUpdateHandler from "../state/useStateUpdateHandler";

const ReconnectContext = createContext();

const ReconnectProvider = ({ children }) => {
  const navigate = useNavigate();
  const { reenterRoom } = useStateUpdateHandler();

  useEffect(() => {
    const canReconnect = getReconnectCookieValue();
    canReconnect ? reconnect() : navigate("/");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getReconnectCookieValue = () => {
    return !!document.cookie.split(";")[0]?.split("=")[1];
  };

  const reconnect = () => {
    requestRoomReconnect()
      .then((response) => reenterRoom(response.data.room, response.data.player))
      .then(() => navigate("/room"))
      .catch(() => {
        deleteReconnectCookie();
        navigate("/");
      });
  };

  const deleteReconnectCookie = () => {
    document.cookie = "RECONNECT=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return <ReconnectContext.Provider value={null}>{children}</ReconnectContext.Provider>;
};

export default ReconnectProvider;

export const useReconnect = () => {
  return useContext(ReconnectContext);
};
