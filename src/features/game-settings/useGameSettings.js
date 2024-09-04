import { useDispatch, useSelector } from "react-redux";
import { requestImageDownload, requestImageUpload } from "../api/apiRequest";
import { setImages } from "../room/roomSlice";

const useGameSettings = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.roomManager.room);

  const uploadImages = (images) => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    requestImageUpload({ roomId: room.id, formData })
      .then(() =>
        requestImageDownload({ roomId: room.id })
          .then((response) => dispatch(setImages(response.data)))
          .catch(() => {})
      )
      .catch(() => {});
  };

  return { uploadImages };
};

export default useGameSettings;
