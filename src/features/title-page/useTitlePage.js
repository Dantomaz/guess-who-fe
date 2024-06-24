import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_INIT_PLAYER } from "../api/api";
import { setPlayer } from "../player/playerSlice";

const useTitlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const url = API_INIT_PLAYER.replace("{playerName}", data.playerName);

    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, request)
      .then((response) => response.json())
      .then((response) => {
        if (response?.error) {
          console.error(response);
          return;
        }
        dispatch(setPlayer(response));
        navigate("/room/join");
      })
      .catch((error) => console.error(error));
  };

  return { onSubmit };
};

export default useTitlePage;
