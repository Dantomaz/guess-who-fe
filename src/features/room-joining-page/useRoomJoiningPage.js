import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_CREATE_ROOM, API_JOIN_ROOM, API_TOPIC_ROOM, API_TOPIC_ROOM_COUNTER } from "../api/api";
import { useWebSocketClientContext } from "../api/web-socket/WebSocketClientProvider";
import { updatePlayer } from "../player/playerSlice";
import { setCounter } from "../room/counterSlice";
import { setRoom } from "../room/roomSlice";

const useRoomJoiningPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((state) => state.playerManager.player);
  const { publish, subscribe } = useWebSocketClientContext();

  const onJoin = (data) => {
    console.log("joining room...");
    subscribeRoom(data.roomId);
    publish(API_JOIN_ROOM.replace("{roomId}", data.roomId), player)
      .then(() => {
        console.log("joined room ", data.roomId);
        navigate("/room");
      })
      .catch((error) => console.error("onJoin error: ", error));
  };

  const onCreate = () => {
    const url = API_CREATE_ROOM;

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    };

    fetch(url, request)
      .then((response) => response.json())
      .then((response) => {
        if (response?.error) {
          console.error(response);
          return;
        }
        setRoomInfo(response);
        subscribeRoom(response.id);
        navigate("/room");
      })
      .catch((error) => console.error(error));
  };

  const subscribeRoom = (roomId) => {
    subscribe(API_TOPIC_ROOM.replace("{roomId}", roomId), setRoomInfo);
    subscribe(API_TOPIC_ROOM_COUNTER.replace("{roomId}", roomId), setCounterCallback);
  };

  const setRoomInfo = (room) => {
    console.log("setRoomInfo: ", room);
    dispatch(setRoom(room));
    dispatch(updatePlayer(extractPlayerFromRoom(room)));
  };

  const extractPlayerFromRoom = (room) => {
    return room.players?.filter((p) => p.id === player.id)[0];
  };

  const setCounterCallback = (data) => {
    dispatch(setCounter(data));
  };

  return { onJoin, onCreate };
};

export default useRoomJoiningPage;
