import { useDispatch, useSelector } from "react-redux";
import {
  publishPlayerChangeTeam,
  subscribeTopicGameState,
  subscribeTopicImages,
  subscribeTopicPlayers,
  unsubscribeTopicGameState,
} from "../api/apiRequest";
import { setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { setImages, setPlayers, setRoom } from "../room/roomSlice";

const useStateUpdateHandler = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);
  const player = useSelector((state) => state.playerManager.player);

  const enterRoom = (room) => {
    updateRoomState(room, room.players[player.id]);
  };

  const reenterRoom = (room, player) => {
    updateRoomState(room, player);
    if (player.team && player.team !== "NONE") {
      subscribeTopicGameState({ roomId: room.id, team: player.team, callback: updateGameState });
    }
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
  };

  const updatePlayerInfo = (players, playerId) => {
    dispatch(setPlayers(players));
    const playerInfo = players[playerId];
    dispatch(playerInfo ? setPlayer(playerInfo) : resetPlayer());
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

  return { enterRoom, reenterRoom, switchTeam };
};

export default useStateUpdateHandler;
