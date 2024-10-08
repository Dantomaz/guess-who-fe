import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publishGameRestart } from "../api/apiRequest";

const useRoomSettings = ({ hidePanel }) => {
  const room = useSelector((state) => state.roomManager.room);
  const [playersNumber, setPlayersNumber] = useState();

  useEffect(() => {
    const numberOfPlayers = Object.values(room.players).length;
    setPlayersNumber(numberOfPlayers);
  }, [room.players]);

  const chooseFunnyText = (numberOfPlayers) => {
    if (numberOfPlayers >= 12) {
      return "Now you're just flexing...";
    }
    if (numberOfPlayers >= 8) {
      return "Damn, that's a lot!";
    }
    if (numberOfPlayers >= 4) {
      return "Now that's a party!";
    }
    if (numberOfPlayers >= 2) {
      return "Enough to have some fun :)";
    }
    if (numberOfPlayers === 1) {
      return "It's only you... for now";
    }
  };

  const resetGame = () => {
    publishGameRestart({ roomId: room.id });
    hidePanel();
  };

  return { playersNumber, chooseFunnyText, resetGame };
};

export default useRoomSettings;
