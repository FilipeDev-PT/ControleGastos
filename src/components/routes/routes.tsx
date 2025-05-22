import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Extract from "../pages/extract/extract";
import Statistic from "../pages/statistic/statistic";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Extract" element={<Extract />} />
        <Route path="/Statistic" element={<Statistic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
