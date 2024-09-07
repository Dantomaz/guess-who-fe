import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { areBothTeamsPresent } from "../../global/utils";
import { publishGamePrepare, requestImageUpload } from "../api/apiRequest";
import { setImages } from "../room/roomSlice";

const useGameSettings = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);
  const [isDragAndDropVisible, setIsDragAndDropVisible] = useState(false);

  const uploadImages = (images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    requestImageUpload({ roomId: room.id, formData })
      .then((response) => dispatch(setImages(response.data)))
      .then(() => hideDragAndDrop())
      .catch((error) => console.error(error));
  };

  const showDragAndDrop = () => {
    setIsDragAndDropVisible(true);
  };

  const hideDragAndDrop = () => {
    setIsDragAndDropVisible(false);
  };

  const prepareGame = () => {
    if (areBothTeamsPresent(room.players)) {
      publishGamePrepare({ roomId: room.id });
    }
  };

  return { isDragAndDropVisible, showDragAndDrop, hideDragAndDrop, uploadImages, ready: !!room.images, prepareGame };
};

export default useGameSettings;
