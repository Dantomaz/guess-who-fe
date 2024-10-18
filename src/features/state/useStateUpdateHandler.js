import { useDispatch, useSelector } from "react-redux";
import { subscribeTopicGameState, subscribeTopicImages, subscribeTopicPlayers } from "../api/apiRequest";
import { setGameState } from "../game-state/gameStateSlice";
import { resetPlayer, setPlayer } from "../player/playerSlice";
import { setImages, setPlayers, setRoom } from "../room/roomSlice";

const useStateUpdateHandler = () => {
  const dispatch = useDispatch();
  const playerId = useSelector((state) => state.playerManager.player?.id);

  const enterRoom = (room) => {
    const player = room.players[playerId];
    updateRoomState(room, player);
  };

  const reenterRoom = (room, player) => {
    updateRoomState(room, player);
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
    subscribeTopicGameState({ roomId, callback: updateGameState });
  };

  const updatePlayerInfo = (players, playerId) => {
    dispatch(setPlayers(players));
    const playerInfo = players[playerId];
    dispatch(playerInfo ? setPlayer(playerInfo) : resetPlayer());
  };

  return { enterRoom, reenterRoom };
};

export default useStateUpdateHandler;
