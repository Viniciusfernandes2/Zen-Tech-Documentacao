import React from "react";
import "./SobreCard.css";

const SobreForm: React.FC = () => {
  return (
    <div className="sobre-container">
      <main className="sobre-main">
        <div className="sobre-card">
          <div className="logo-titulo">
            <img src="/img/Logo.jpg" alt="Logo" className="login-logo" />
            <h1>Zen-Tech</h1>
          </div>
          <p>
            A empresa Zen-Tech é responsável por esta plataforma inovadora e especializada em soluções tecnológicas aplicadas à meteorologia e segurança ambiental. Ela foi desenvolvida para monitorar e alertar sobre condições meteorológicas críticas no lago de Furnas, especialmente eventos de vento extremo e ondas que representam riscos aos navegantes. O sistema emite alertas para os moradores dos 30 municípios próximos ao lago, ajudando a prevenir acidentes como naufrágios. Ela coleta dados de estações meteorológicas, exibindo-os de forma interativa em gráficos e tabelas.
          </p>
        </div>

        <div className="sobre-img">
          <img src="img/furnas.jpg" />
        </div>
      </main>
    </div>
  );
};

export default SobreForm;