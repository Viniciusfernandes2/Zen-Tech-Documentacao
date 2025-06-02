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
        <h1>Bem-vindo à Home Page!</h1>
        <p>Esta é a página inicial do site.</p>
         <WeatherCardFurnas />
         <ClimaSemana/>
      </main>
    </div>
  );
};

export default HomePage;