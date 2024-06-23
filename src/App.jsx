import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Welcome from "./pages/welcome/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
