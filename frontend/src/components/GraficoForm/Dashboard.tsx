import React, { useState } from "react";
import GraficoApex from "../GraficoForm/GraficoApex";
import { graficoReserv } from "../../services/graficoService"; 
import "./Dashboard.css";
import "./Grafico.css"
import SidebarExtensao from "../GraficoForm/SidebarExtensao";

type GraficoConfig = {
  id: string;
  label: string;
  campo: string;
  tituloY: string;
  nomeGrafico: string;
  nomeEstacao: string;
};

const graficosDisponiveis: GraficoConfig[] = [
  {
    id: "temp",
    label: "Temperatura (°C)",
    campo: "temp",
    tituloY: "Temperatura (°C)",
    nomeGrafico: "Gráfico de Temperatura (°C)",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "hum",
    label: "Umidade (%)",
    campo: "hum",
    tituloY: "Umidade (%)",
    nomeGrafico: "Gráfico de Umidade (%)",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "bar",
    label: "Pressão (hPa)",
    campo: "bar",
    tituloY: "Pressão (hPa)",
    nomeGrafico: "Gráfico de Pressão (hPa)",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "uv_level",
    label: "Radiação UV",
    campo: "uv_level",
    tituloY: "Índice UV",
    nomeGrafico: "Gráfico de Radiação UV",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "wind_peak",
    label: "Pico de Vento (m/s)",
    campo: "wind_peak",
    tituloY: "Pico de Vento (m/s)",
    nomeGrafico: "Gráfico de Pico de Vento (m/s)",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "wind_rt",
    label: "Vento Instantâneo (m/s)",
    campo: "wind_rt",
    tituloY: "Vento Instantâneo (m/s)",
    nomeGrafico: "Gráfico de Vento Instantâneo",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "wind_avg",
    label: "Vento Médio (m/s)",
    campo: "wind_avg",
    tituloY: "Vento Médio (m/s)",
    nomeGrafico: "Gráfico de Vento Médio",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "wind_dir_rt",
    label: "Direção do Vento Inst.",
    campo: "wind_dir_rt",
    tituloY: "Direção Inst.",
    nomeGrafico: "Gráfico de Direção do Vento Inst.",
    nomeEstacao: "hidro29_estfrn02",
  },
  {
    id: "wind_dir_avg",
    label: "Direção do Vento Média",
    campo: "wind_dir_avg",
    tituloY: "Direção Média",
    nomeGrafico: "Gráfico de Direção do Vento Média",
    nomeEstacao: "hidro29_estfrn02",
  },
];

const Dashboard: React.FC = () => {
  const [graficosAtivos, setGraficosAtivos] = useState<string[]>([]);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [extensaoAberta, setExtensaoAberta] = useState(false);

  const handleToggleGrafico = (id: string) => {
    setGraficosAtivos((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar-container">
        {/* Botão fixo para abrir/fechar a sidebar principal, alinhado com a sidebar */}
        <div
          style={{
            position: 'fixed',
            top: 70,
            left: 0,
            height: 'calc(100vh - 70px)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <button
            className="sidebar-toggle"
            onClick={() => {
              if (sidebarAberta) {
                setSidebarAberta(false);
                setExtensaoAberta(false);
              } else {
                setSidebarAberta(true);
              }
            }}
          >
            {sidebarAberta ? '❮' : '❯'}
          </button>
        </div>
        {/* Sidebar principal */}
        <aside className={`sidebar${sidebarAberta ? ' open' : ''}`}>
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
          <button
            className="sidebar-extension-btn"
            onClick={() => setExtensaoAberta((prev) => !prev)}
          >
            {extensaoAberta ? '❮' : '❯'}
          </button>
        </aside>
        <SidebarExtensao 
          onClose={() => setExtensaoAberta(false)} 
          isOpen={extensaoAberta} 
        />
      </div>
      <main className="content">
        {graficosDisponiveis
          .filter((grafico) => graficosAtivos.includes(grafico.id))
          .map((grafico) => (
            <div key={grafico.id} className="grafico-wrapper">
              <GraficoApex
                campo={grafico.campo}
                tituloY={grafico.tituloY}
                nomeGrafico={grafico.nomeGrafico}
                nomeEstacao={grafico.nomeEstacao}
                fetchData={graficoReserv}
              />
            </div>
          ))}
      </main>
    </div>
  );
};
export default Dashboard;
