import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  publishPlayerChangeTeam,
  subscribeTopicDisconnect,
  subscribeTopicGameState,
  subscribeTopicImages,
  subscribeTopicPlayers,
  unsubscribeTopicTeams,
} from "../api/apiRequest";
import { connect, disconnect, unsubscribeAll } from "../api/web-socket/stompClient";
import { setDisconnectInfo } from "../disconnect/disconnectSlice";
import { resetGameState, setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { resetRoom, setImages, setPlayers, setRoom } from "../room/roomSlice";

const useStateUpdateHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enterRoom = (room) => {
    connect();
    updateRoomState(room, room.players[localStorage.getItem("playerId")]);
  };

  const reenterRoom = (room, player) => {
    connect();
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
    subscribeTopicDisconnect({ roomId, playerId, callback: handleDisconnect });
  };

  const updatePlayerInfo = (players, playerId) => {
    dispatch(setPlayers(players));
    const playerInfo = players[playerId];

    if (playerInfo) {
      dispatch(setPlayer(playerInfo));
      updateTeamSubscription(playerInfo.team);
    } else {
      dispatch(resetPlayer());
    }
  };

  const handleDisconnect = (reason) => {
    dispatch(setDisconnectInfo({ disconnected: true, reason }));
    leaveRoom();
  };

  const leaveRoom = () => {
    navigate("/", { replace: true });
    disconnect();
    resetState();
  };

  const switchTeam = (newTeam) => {
    publishPlayerChangeTeam({ roomId: localStorage.getItem("roomId"), playerId: localStorage.getItem("playerId"), newTeam });
  };

  const updateTeamSubscription = (newTeam) => {
    unsubscribeTopicTeams();

    if (newTeam && newTeam !== "NONE") {
      subscribeTopicGameState({ roomId: localStorage.getItem("roomId"), team: newTeam, callback: updateGameState });
    }
  };

  return { enterRoom, reenterRoom, leaveRoom, switchTeam };
};

export default useStateUpdateHandler;
