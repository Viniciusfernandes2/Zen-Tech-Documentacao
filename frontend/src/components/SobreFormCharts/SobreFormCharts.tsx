import React from "react";
import "./SobreCard.css";

const SobreFormCharts: React.FC = () => {
  return (
    <div className="sobre-container">
      <main className="sobre-main">
        <div className="sobre-card">
          <div className="logo-titulo">
            <h1>Como usar os gráficos:</h1>
          </div>
          <p>
            <strong>1.</strong> Passe o mouse sobre a seta lateral para abrir o menu com os dados disponíveis.
          </p>
          <p>
            <strong>2.</strong> Marque os dados que você deseja visualizar, como Temperatura ou Umidade.
          </p>
          <p>
            <strong>3.</strong> Escolha a data no campo "Data" acima do gráfico para ver os dados do dia selecionado.
          </p>
        </div>

        <div className="sobre-img">
          <img src="/img/SobreCharts.png" />
        </div>
      </main>
    </div>
  );
};

export default SobreFormCharts;