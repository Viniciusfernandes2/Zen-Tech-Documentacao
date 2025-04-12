import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
  } from "react-router-dom";

import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import SobrePage from "../pages/SobrePage";
import Graficos from "../pages/GraficoPage";
import Graficos2 from "../pages/GraficoPage2";

export const AppRouter = () => {
    const location = useLocation();
    return (
      
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login/>} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/sobre-page" element={<SobrePage />} />
          <Route path="/grafico-page" element={<Graficos />} />
          <Route path="/grafico-page2" element={<Graficos2 />} />


          </Routes>
    );
  };
  