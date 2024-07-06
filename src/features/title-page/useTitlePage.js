import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPlayerInit } from "../api/apiRequest";
import { unsubscribeAll } from "../api/web-socket/stompClient";
import { setPlayer } from "../player/playerSlice";

const useTitlePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // get rid of all subscriptions from the previous room
    unsubscribeAll();
  }, []);

  const onSubmit = (data) => {
    requestPlayerInit({ nickname: data.nickname.trim() })
      .then((response) => {
        dispatch(setPlayer(response.data));
        navigate("/room/join");
      })
      .catch(() => {});
  };

  return { onSubmit };
};

export default useTitlePage;
