import { useDispatch, useSelector } from "react-redux";
import { useBoolean } from "usehooks-ts";
import { publishGamePrepare, requestImagesUpload } from "../api/apiRequest";
import { setImages } from "../room/roomSlice";

const useGameSettings = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);
  const images = useSelector((state) => state.roomManager.room.images);
  const { value: isDragAndDropVisible, setTrue: showDragAndDrop, setFalse: hideDragAndDrop } = useBoolean();
  const { value: useDefaultImages, setTrue: setDefaultImages, setFalse: setCustomImages } = useBoolean(true);

  const imagesUploaded = images && images.length > 0;
  const playerList = Object.values(room.players);
  const isStartButtonDisabled = !arePlayersReadyToStart(playerList);
  const numberOfAllPlayers = playerList.length;
  const numberOfPlayersInTeam = playerList.filter((player) => player.team === "RED" || player.team === "BLUE").length;

  function arePlayersReadyToStart(players) {
    const isEnoughPlayers = (players) => {
      return players.length > 1;
    };

    const bothTeamsHaveAtLeastOnePlayer = (players) => {
      const bluePresent = players.some((player) => player.team === "BLUE");
      const redPresent = players.some((player) => player.team === "RED");
      return bluePresent && redPresent;
    };

    const everyPlayerChoseTeam = (players) => {
      return players.every((player) => player.team !== "NONE");
    };

    return isEnoughPlayers(players) && bothTeamsHaveAtLeastOnePlayer(players) && everyPlayerChoseTeam(players);
  }

  const uploadImages = (images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image, image.name));

    requestImagesUpload({ roomId: room.id, formData })
      .then((response) => dispatch(setImages(response.data)))
      .then(hideDragAndDrop)
      .catch(console.error);
  };

  const prepareGame = () => {
    publishGamePrepare({ roomId: room.id, useDefaultImages });
  };

  const onSetDefaultImages = () => {
    setDefaultImages();
  };

  const onSetCustomImages = () => {
    setCustomImages();
    if (!imagesUploaded) {
      showDragAndDrop();
    }
  };

  const onCancelCustomImages = () => {
    hideDragAndDrop();
    if (!imagesUploaded) {
      setDefaultImages();
    }
  };

  return {
    isDragAndDropVisible,
    showDragAndDrop,
    imagesUploaded,
    uploadImages,
    isStartButtonDisabled,
    numberOfAllPlayers,
    numberOfPlayersInTeam,
    prepareGame,
    useDefaultImages,
    onSetDefaultImages,
    onSetCustomImages,
    onCancelCustomImages,
  };
};

export default useGameSettings;
