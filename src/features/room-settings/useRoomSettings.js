import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useRoomSettings = () => {
  const room = useSelector((state) => state.roomManager.room);
  const [playersNumber, setPlayersNumber] = useState();

  useEffect(() => {
    const length = Object.values(room.players).length;
    setPlayersNumber(length);
  }, [room.players]);

  const chooseFunnyText = (length) => {
    if (length >= 12) {
      return "Now you're just flexing...";
    }
    if (length >= 8) {
      return "Damn, that's a lot!";
    }
    if (length >= 4) {
      return "Now that's a party!";
    }
    if (length >= 2) {
      return "Enough to have some fun :)";
    }
    if (length === 1) {
      return "It's only you... for now";
    }
  };

  return { playersNumber, chooseFunnyText };
};

export default useRoomSettings;
