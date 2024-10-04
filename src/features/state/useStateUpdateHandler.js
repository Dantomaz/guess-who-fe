import { useDispatch, useSelector } from "react-redux";
import { subscribeTopicGameState, subscribeTopicImages, subscribeTopicPlayers } from "../api/apiRequest";
import { setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { setImages, setPlayers, setRoom } from "../room/roomSlice";

const useStateUpdateHandler = () => {
  const dispatch = useDispatch();
  const playerId = useSelector((state) => state.playerManager.player?.id);

  const enterRoom = (room) => {
    updateRoomState(room, room.players[playerId]);
  };

  const reenterRoom = (room, player) => {
    updateRoomState(room, player);
  };

  const updateRoomState = (room, player) => {
    dispatch(setPlayer(player));
    updateGameStateInfo(room.gameState);
    const { gameState, ...roomOnly } = room;
    updateRoomInfo(roomOnly);
    subscribeToRoomActivity(room.id, player.id);
  };

  const updateGameStateInfo = (gameState) => {
    dispatch(setGameState(gameState));
  };

  const updateRoomInfo = (room) => {
    delete room.gameState;
    dispatch(setRoom(room));
  };

  const subscribeToRoomActivity = (roomId, playerId) => {
    subscribeTopicImages({ roomId, callback: updateImages });
    subscribeTopicPlayers({ roomId, callback: (players) => updatePlayerInfo(players, playerId) });
    subscribeTopicGameState({ roomId, callback: updateGameState });
  };

  const updateImages = (images) => {
    dispatch(setImages(images));
  };

  const updatePlayerInfo = (players, playerId) => {
    dispatch(setPlayers(players));
    const playerInfo = players[playerId];
    dispatch(playerInfo ? setPlayer(playerInfo) : resetPlayer());
  };

  const updateGameState = (gameState) => {
    dispatch(setGameState(gameState));
  };

  return { enterRoom, reenterRoom };
};

export default useStateUpdateHandler;
