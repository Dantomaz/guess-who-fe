import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  publishPlayerChangeTeam,
  subscribeTopicGameState,
  subscribeTopicImages,
  subscribeTopicPlayers,
  subscribeTopicSessionInvalidate,
  unsubscribeTopicGameState,
} from "../api/apiRequest";
import { unsubscribeAll } from "../api/web-socket/stompClient";
import { resetGameState, setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { resetRoom, setImages, setPlayers, setRoom } from "../room/roomSlice";
import { setUserTimedOut } from "../timeout/timeoutSlice";

const useStateUpdateHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const enterRoom = (room) => {
    resetState();
    updateRoomState(room, room.players[player.id]);
  };

  const reenterRoom = (room, player) => {
    resetState();
    updateRoomState(room, player);
    if (player.team && player.team !== "NONE") {
      subscribeTopicGameState({ roomId: room.id, team: player.team, callback: updateGameState });
    }
  };

  const resetState = () => {
    unsubscribeAll();
    dispatch(resetGameState());
    dispatch(resetRoom());
    dispatch(resetPlayer());
  };

  const updateRoomState = (room, player) => {
    dispatch(setPlayer(player));
    const { images, gameState, ...roomInfo } = room;
    updateRoomInfo(roomInfo);
    updateGameState(gameState);
    updateImages(images);
    subscribeToRoomActivity(room.id, player.id);
  };

  const updateRoomInfo = (room) => {
    dispatch(setRoom(room));
  };

  const updateGameState = (gameState) => {
    dispatch(setGameState(gameState));
  };

  const updateImages = (images) => {
    dispatch(setImages(images));
  };

  const subscribeToRoomActivity = (roomId, playerId) => {
    subscribeTopicImages({ roomId, callback: updateImages });
    subscribeTopicPlayers({ roomId, callback: (players) => updatePlayerInfo(players, playerId) });
    subscribeTopicSessionInvalidate({ roomId, playerId, callback: timeout });
  };

  const updatePlayerInfo = (players, playerId) => {
    dispatch(setPlayers(players));
    const playerInfo = players[playerId];
    dispatch(playerInfo ? setPlayer(playerInfo) : resetPlayer());
  };

  const timeout = () => {
    dispatch(setUserTimedOut(true));
    leaveRoom();
  };

  const leaveRoom = () => {
    resetState();
    navigate("/", { replace: true });
  };

  const switchTeam = (newTeam) => {
    const currentTeam = player.team;
    if (currentTeam && currentTeam !== "NONE") {
      unsubscribeTopicGameState({ roomId: room.id, team: currentTeam });
    }
    if (newTeam !== "NONE") {
      subscribeTopicGameState({ roomId: room.id, team: newTeam, callback: updateGameState });
    }
    publishPlayerChangeTeam({ roomId: room.id, playerId: player.id, newTeam });
  };

  return { enterRoom, reenterRoom, leaveRoom, switchTeam };
};

export default useStateUpdateHandler;
