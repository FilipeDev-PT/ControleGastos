import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Extract from "../pages/extract/extract";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Extract" element={<Extract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
