import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../global/components/modal/Modal";
import { clearDisconnected } from "./disconnectSlice";

const DisconnectModal = () => {
  const dispatch = useDispatch();
  const disconnectInfo = useSelector((state) => state.disconnectNotifier.info);

  const message = { kick: "You have been kicked by the host", timeout: "You have been inactive for too long" }[disconnectInfo.reason];

  const onOk = () => {
    dispatch(clearDisconnected());
  };

  return <Modal show={disconnectInfo.disconnected} header={message} onOk={onOk} />;
};

export default DisconnectModal;
