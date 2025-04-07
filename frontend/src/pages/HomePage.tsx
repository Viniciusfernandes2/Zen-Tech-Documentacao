import React from "react";
import Header from "../components/Header/header"; // Importando o Header
import "../styles/HomePage.css"; 

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <h1>Bem-vindo à Home Page!</h1>
        <p>Esta é a página inicial do site.</p>
      </main>
    </div>
  );
};

export default HomePage;