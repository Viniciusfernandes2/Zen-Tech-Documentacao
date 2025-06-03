import React from "react";
import Header from "../components/Header/header"; // Importando o Header
import "../styles/HomePage.css"; 
import WeatherCardFurnas from "../components/ClimaFurnas/ClimaFurnas";
import ClimaSemana from "../components/ClimaSemana/ClimaSemana";

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
         <WeatherCardFurnas />
         <ClimaSemana/>
      </main>
    </div>
  );
};

export default HomePage;