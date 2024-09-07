import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { extractAxiosErrorResponseDetail } from "../../global/utils";
import { requestPlayerJoinRoom, requestRoomCreate, subscribeTopicGameState, subscribeTopicImages, subscribeTopicPlayers } from "../api/apiRequest";
import { setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { setImages, setPlayers, setRoom } from "../room/roomSlice";

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
    // order of updating 'gameState' and 'room' is important, because of deleting 'gameState' property from 'room' object
    updateGameStateInfo(room.gameState);
    updateRoomInfo(room);
    dispatch(setPlayer(room.players[player.id]));
    subscribeToRoomActivity(room.id);
    navigate("/room");
  };

  const updateRoomInfo = (room) => {
    delete room.gameState;
    dispatch(setRoom(room));
  };

  const updateGameStateInfo = (gameState) => {
    dispatch(setGameState(gameState));
  };

  const subscribeToRoomActivity = (roomId) => {
    subscribeTopicImages({ roomId, callback: updateImages });
    subscribeTopicPlayers({ roomId, callback: updatePlayerInfo });
    subscribeTopicGameState({ roomId, callback: updateGameState });
  };

  const updateImages = (images) => {
    dispatch(setImages(images));
  };

  const updatePlayerInfo = (players) => {
    dispatch(setPlayers(players));
    const playerInfo = players[player.id];
    dispatch(playerInfo ? setPlayer(playerInfo) : resetPlayer());
  };

  const updateGameState = (gameState) => {
    dispatch(setGameState(gameState));
  };

  const onCreate = () => {
    requestRoomCreate({ player })
      .then((response) => enterRoom(response.data))
      .catch((error) => console.error(error));
  };

  return { onJoin, onCreate, errorOnJoin };
};

export default useRoomJoiningPage;
