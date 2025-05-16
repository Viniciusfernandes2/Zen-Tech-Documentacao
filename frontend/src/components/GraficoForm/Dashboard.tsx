import React, { useState } from "react";
import GraficoApex from "../GraficoForm/GraficoApex";
import { graficoReserv, graficoColinas } from "../../services/graficoService";
import "./Dashboard.css"; 
type GraficoConfig = {
  id: string;
  label: string;
  campo: string;
  tituloY: string;
  nomeGrafico: string;
  nomeGraficoReserv: string;
  nomeGraficoColinas: string;
};

const graficosDisponiveis: GraficoConfig[] = [
  {
    id: "Temp_C",
    label: "Temp_C",
    campo: "Temp_C",
    tituloY: "Temperatura (°C)",
    nomeGrafico: "Gráfico de Temperatura (°C)",
    nomeGraficoReserv: "Reservatório - Temperatura (°C)",
    nomeGraficoColinas: "Colinas - Temperatura (°C)",
  },
  {
    id: "Hum_%",
    label: "Hum_%",
    campo: "Hum_%",
    tituloY: "Umidade (%)",
    nomeGrafico: "Gráfico de Umidade (%)",
    nomeGraficoReserv: "Reservatório - Umidade (%)",
    nomeGraficoColinas: "Colinas - Umidade (%)",
  },
  {
    id: "Press_Bar",
    label: "Press_Bar",
    campo: "Press_Bar",
    tituloY: "Pressão (Bar)",
    nomeGrafico: "Gráfico de Pressão (Bar)",
    nomeGraficoReserv: "Reservatório - Pressão (Bar)",
    nomeGraficoColinas: "Colinas - Pressão (Bar)",
  },
  {
    id: "SR_Wm2",
    label: "SR_Wm2",
    campo: "SR_Wm2",
    tituloY: "Gráfico de Radiação de ondas curtas (W/m²)",
    nomeGrafico: "Gráfico de Radiação de ondas curtas (W/m²)",
    nomeGraficoReserv: "Reservatório - Radiação de ondas curtas (W/m²)",
    nomeGraficoColinas: "Colinas - Radiação de ondas curtas (W/m²)",
  },

  {
    id: "WindPeak_ms",
    label: "WindPeak_ms",
    campo: "WindPeak_ms",
    tituloY: "WindPeak (m/s)",
    nomeGrafico: "Gráfico de Pico de Vento (m/s)",
    nomeGraficoReserv: "Reservatório - Pico de Vento (m/s)",
    nomeGraficoColinas: "Colinas - Pico de Vento (m/s)",
  },
  {
    id: "windspeed_inst",
    label: "WindSpeed Inst",
    campo: "WindSpeed_Inst ",
    tituloY: "WindSpeed (Inst)",
    nomeGrafico: "Gráfico de Velocidade do Vento Instantâneo",
    nomeGraficoReserv: "Reservatório - Velocidade do Vento Instantâneo",
    nomeGraficoColinas: "Colinas - Velocidade do Vento Instantâneo",
  },
  {
    id: "WindSpeed_Avg",
    label: "WindSpeed_Avg",
    campo: "WindSpeed_Avg",
    tituloY: "WindSpeed (Inst)",
    nomeGrafico: "Gráfico de Velocidade do Vento Média",
    nomeGraficoReserv: "Reservatório - Velocidade do Vento Média",
    nomeGraficoColinas: "Colinas - Velocidade do Vento Média",
  },
  {
    id: "WindDir_Inst",
    label: "WindDir_Inst",
    campo: "WindDir_Inst",
    tituloY: "WindDir Instantâneo",
    nomeGrafico: "Gráfico de Direção do Vento Instantâneo",
    nomeGraficoReserv: "Reservatório - Direção do Vento Instantâneo",
    nomeGraficoColinas: "Colinas - Direção do Vento Instantâneo",
  },
  {
    id: "wind_avg",
    label: "wind_avg",
    campo: "wind_avg",
    tituloY: "wind_avg",
    nomeGrafico: "Gráfico de Velocidade do Vento Instantâneo",
    nomeGraficoReserv: "Reservatório - Velocidade do Vento Instantâneo",
    nomeGraficoColinas: "Colinas - Velocidade do Vento Instantâneo",
  },
];

const Dashboard: React.FC = () => {
  const [graficosAtivos, setGraficosAtivos] = useState<string[]>([]);

  const handleToggleGrafico = (id: string) => {
    setGraficosAtivos((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        {graficosDisponiveis.map((grafico) => (
          <label key={grafico.id}>
            <input
              type="checkbox"
              checked={graficosAtivos.includes(grafico.id)}
              onChange={() => handleToggleGrafico(grafico.id)}
            />
            {grafico.label}
          </label>
        ))}
      </aside>

      <main className="content">
        {graficosDisponiveis
          .filter((grafico) => graficosAtivos.includes(grafico.id))
          .map((grafico) => (
            <div key={grafico.id} className="grafico-wrapper">
              <GraficoApex
                campo={grafico.campo}
                tituloY={grafico.tituloY}
                nomeGrafico={grafico.nomeGrafico}
                nomeGraficoReserv={grafico.nomeGraficoReserv}
                nomeGraficoColinas={grafico.nomeGraficoColinas}
                fetchReserv={graficoReserv}
                fetchColinas={graficoColinas}
              />
            </div>
          ))}
      </main>
    </div>
  );
};

export default Dashboard;
