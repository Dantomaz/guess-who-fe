import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { publishGamePrepare, requestImageUpload } from "../api/apiRequest";
import { setImages } from "../room/roomSlice";

const useGameSettings = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);
  const { value: isDragAndDropVisible, setTrue: showDragAndDrop, setFalse: hideDragAndDrop } = useBoolean();

  const arePlayersReadyToStart = (players) => {
    const playerList = Object.values(players);

    const isEnoughPlayers = (players) => {
      return Object.values(players).length > 1;
    };

    const bothTeamsHaveAtLeastOnePlayer = (players) => {
      const bluePresent = players.some((player) => player.team === "BLUE");
      const redPresent = players.some((player) => player.team === "RED");
      return bluePresent && redPresent;
    };

    const everyPlayerChoseTeam = (players) => {
      return Object.values(players).every((player) => player.team !== "NONE");
    };

    return isEnoughPlayers(playerList) && bothTeamsHaveAtLeastOnePlayer(playerList) && everyPlayerChoseTeam(playerList);
  };

  const isStartButtonDisabled = !arePlayersReadyToStart(room.players);

  const uploadImages = (images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    requestImageUpload({ roomId: room.id, formData })
      .then((response) => dispatch(setImages(response.data)))
      .then(() => hideDragAndDrop())
      .catch((error) => console.error(error));
  };

  const prepareGame = () => {
    publishGamePrepare({ roomId: room.id });
  };

  return { isDragAndDropVisible, showDragAndDrop, hideDragAndDrop, uploadImages, ready: !!room.images, isStartButtonDisabled, prepareGame };
};

export default useGameSettings;
