import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { extractAxiosErrorResponseDetail, extractPlayerFromPlayersList } from "../../global/utils";
import { requestPlayerJoinRoom, requestRoomCreate, subscribeTopicPlayers } from "../api/apiRequest";
import { setPlayer } from "../player/playerSlice";
import { setPlayers, setRoom } from "../room/roomSlice";

const useRoomJoiningPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.playerManager.player);
  const [errorOnJoin, setErrorOnJoin] = useState();

  const onJoin = (data) => {
    const roomId = data.roomId;
    requestPlayerJoinRoom({ roomId, player })
      .then((response) => enterRoom(response.data))
      .catch((error) => setErrorOnJoin(extractAxiosErrorResponseDetail(error)));
  };

  const enterRoom = (room) => {
    updateRoomInfo(room);
    subscribeToRoomActivity(room.id);
    navigate("/room");
  };

  const updateRoomInfo = (room) => {
    dispatch(setRoom(room));
  };

  const subscribeToRoomActivity = (roomId) => {
    subscribeTopicPlayers({ roomId, callback: updatePlayerInfo });
  };

  const updatePlayerInfo = (players) => {
    dispatch(setPlayers(players));
    dispatch(setPlayer(extractPlayerFromPlayersList(players, player.id)));
  };

  const onCreate = () => {
    requestRoomCreate({ player })
      .then((response) => enterRoom(response.data))
      .catch((error) => console.error(error));
  };

  return { onJoin, onCreate, errorOnJoin };
};

export default useRoomJoiningPage;
