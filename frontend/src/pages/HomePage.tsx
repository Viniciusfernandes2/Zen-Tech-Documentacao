import React from "react";
import Header from "../components/Header/header";
import "../styles/HomePage.css";
import WeatherCardFurnas from "../components/ClimaFurnas/ClimaFurnas";
import ClimaSemana from "../components/ClimaSemana/ClimaSemana";
import Alertas from "../components/Alertas/Alertas";
import IconeSobre from "../components/SobreForm/SobreIcon";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <div className="weather-alerta-container">
          <WeatherCardFurnas />
          <div className="alerta--espaco">
            <Alertas />
          </div>
        </div>
        <ClimaSemana />
        <IconeSobre />
      </main>
    </div>
  );
};

export default HomePage;
