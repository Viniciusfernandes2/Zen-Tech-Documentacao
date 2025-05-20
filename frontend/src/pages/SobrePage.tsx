import React from "react";
import Header from "../components/Header/header";
import "../styles/SobrePage.css";

const SobrePage: React.FC = () => {
  return (
    <div className="sobre-container">
      <Header />
      <main className="sobre-main">
        <div className="sobre-card">
          <h1>Zen-Tech</h1>
          <p>
            A empresa Zen-Tech é responsável por esta plataforma inovadora e
            especializada em soluções tecnológicas aplicadas à meteorologia e
            segurança ambiental. Ela foi desenvolvida para monitorar e alertar
            sobre condições meteorológicas críticas no lago de Furnas,
            especialmente eventos de vento extremo e ondas que representam
            riscos aos navegantes. O sistema emite alertas para os moradores
            dos 30 municípios próximos ao lago, ajudando a prevenir acidentes
            como naufrágios. Ela coleta dados de estações meteorológicas,
            exibindo-os de forma interativa em gráficos e tabelas.
          </p>
        </div>
      </main>
    </div>
  );
};

export default SobrePage;