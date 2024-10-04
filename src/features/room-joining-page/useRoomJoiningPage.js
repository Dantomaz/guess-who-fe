import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { extractAxiosErrorResponseDetail } from "../../global/utils";
import { requestRoomCreate, requestRoomJoin } from "../api/apiRequest";
import useStateUpdateHandler from "../state/useStateUpdateHandler";

const useRoomJoiningPage = () => {
  const navigate = useNavigate();
  const player = useSelector((state) => state.playerManager.player);
  const [errorOnJoin, setErrorOnJoin] = useState();
  const { enterRoom } = useStateUpdateHandler();

  const onJoin = (data) => {
    const roomId = data.roomId;
    requestRoomJoin({ roomId, player })
      .then((response) => enterRoom(response.data))
      .then(() => navigate("/room"))
      .catch((error) => setErrorOnJoin(extractAxiosErrorResponseDetail(error)));
  };

  const onCreate = () => {
    requestRoomCreate({ player })
      .then((response) => enterRoom(response.data))
      .then(() => navigate("/room"))
      .catch((error) => console.error(error));
  };

  return { onJoin, onCreate, errorOnJoin };
};

export default useRoomJoiningPage;
