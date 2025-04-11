import React from "react";
import Header from "../components/Header/header"; // Importando o Header
import "../styles/SobrePage.css";

const SobrePage: React.FC = () => {
  return (
    <div className="sobre-container">
      <Header />
      <main className="sobre-main">
          <div className="sobre-card1">
            <h1>Sobre a empresa</h1>
            <p>
              A empresa responsável por esta plataforma inovadora é especializada em soluções tecnológicas aplicadas à meteorologia e segurança ambiental. 
              Nosso propósito é desenvolver sistemas inteligentes que transformem dados climáticos em informações acessíveis e úteis para a população, 
              contribuindo para a prevenção de acidentes e a tomada de decisões seguras.
            </p>
          </div>
          <div className="sobre-card2">
            <h1>Sobre a plataforma</h1>
            <p>
              Essa é uma plataforma de solução tecnológica desenvolvida para monitorar e alertar sobre condições meteorológicas críticas 
              no lago de Furnas, especialmente eventos de vento extremo que representam riscos aos navegantes. O sistema emite alertas para os moradores dos 30 municípios 
              próximos ao lago, ajudando a prevenir acidentes como naufrágios. 
              Ela coleta dados de três estações meteorológicas, exibindo-os de forma interativa em gráficos e tabelas.
            </p>
          </div>
      </main>
    </div>
  );
};

export default SobrePage;