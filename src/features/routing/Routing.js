import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../not-found-page/NotFoundPage";
import RoomJoiningPage from "../room-joining-page/RoomJoiningPage";
import Room from "../room/Room";
import TitlePage from "../title-page/TitlePage";

const Routing = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/join" element={<RoomJoiningPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {children}
    </BrowserRouter>
  );
};

export default Routing;
