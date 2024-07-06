import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { extractAxiosErrorResponseDetail, extractPlayerFromRoom } from "../../global/utils";
import { requestRoomCreate, requestRoomJoin, subscribeTopicRoom, subscribeTopicRoomCounter } from "../api/apiRequest";
import { setPlayer } from "../player/playerSlice";
import { setCounter } from "../room/counterSlice";
import { setRoom } from "../room/roomSlice";
import { useState } from "react";

const useRoomJoiningPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.playerManager.player);
  const [errorOnJoin, setErrorOnJoin] = useState();

  const onJoin = (data) => {
    subscribeToRoomActivity(data.roomId);
    requestRoomJoin({ roomId: data.roomId, player })
      .then((response) => {
        updateRoomInfo(response.data);
        navigate("/room");
      })
      .catch((error) => setErrorOnJoin(extractAxiosErrorResponseDetail(error)));
  };

  const onCreate = () => {
    requestRoomCreate({ player })
      .then((response) => {
        updateRoomInfo(response.data);
        subscribeToRoomActivity(response.data.id);
        navigate("/room");
      })
      .catch(() => {});
  };

  const subscribeToRoomActivity = (roomId) => {
    subscribeTopicRoom({ roomId, callback: updateRoomInfo });
    subscribeTopicRoomCounter({ roomId, callback: updateCounter });
  };

  const updateRoomInfo = (room) => {
    dispatch(setRoom(room));
    dispatch(setPlayer(extractPlayerFromRoom(room, player.id)));
  };

  const updateCounter = (data) => {
    dispatch(setCounter(data));
  };

  return { onJoin, onCreate, errorOnJoin };
};

export default useRoomJoiningPage;
