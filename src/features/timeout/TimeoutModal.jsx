import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../global/components/modal/Modal";
import { setUserTimedOut } from "./timeoutSlice";

const TimeoutModal = () => {
  const dispatch = useDispatch();
  const userTimedOut = useSelector((state) => state.timeoutNotifier.userTimedOut);
  const TIMEOUT_TEXT = "You have been inactive for too long";

  const onOk = () => {
    dispatch(setUserTimedOut(false));
  };

  return <Modal show={userTimedOut} title={TIMEOUT_TEXT} onOk={onOk} />;
};

export default TimeoutModal;
