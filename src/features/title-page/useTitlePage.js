import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPlayerCreate } from "../api/apiRequest";
import { setPlayer } from "../player/playerSlice";

const useTitlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    requestPlayerCreate({ nickname: data.nickname.trim() })
      .then((response) => {
        dispatch(setPlayer(response.data));
        navigate("/room/join");
      })
      .catch(() => {});
  };

  return { onSubmit };
};

export default useTitlePage;
