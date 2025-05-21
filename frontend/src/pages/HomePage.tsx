import React, { JSX, useEffect, useState } from "react";
import Header from "../components/Header/header";
import "../styles/HomePage.css";
import TableHome from "../components/TempAtual/TempAtual";
import { graficoReserv } from "../services/graficoService";

import { FaWind, FaWater } from "react-icons/fa";
import { MdWarning, MdCheckCircle, MdReportProblem } from "react-icons/md";

// Tipos para os dados de alerta
type AlertType = 'normal' | 'medio' | 'perigoso';

// Mapeamento de cor por alerta
const alertColorMap: Record<AlertType, string> = {
  normal: 'green',
  medio: 'orange',
  perigoso: 'red',
};

// Mapeamento de ícone por alerta
const alertIconMap: Record<AlertType, JSX.Element> = {
  normal: <MdCheckCircle size={24} />,
  medio: <MdReportProblem size={24} />,
  perigoso: <MdWarning size={24} />,
};

const HomePage: React.FC = () => {
  const [windAlert, setWindAlert] = useState<AlertType>('normal');
  const [waveAlert, setWaveAlert] = useState<AlertType>('normal');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await graficoReserv();

        const windAvg = parseFloat(data.wind_avg);
        const windPeak = parseFloat(data.wind_peak);

        const windAvgKmh = windAvg * 3.6;
        const windPeakKmh = windPeak * 3.6;

        setWindAlert(
          windPeakKmh < 10 ? 'normal' :
          windPeakKmh < 30 ? 'medio' : 'perigoso'
        );

        setWaveAlert(
          windAvgKmh < 10 ? 'normal' :
          windAvgKmh < 25 ? 'medio' : 'perigoso'
        );
      } catch (error) {
        console.error("Erro ao buscar dados de vento:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <h1>Alertas!</h1>
        <p>Alertas de ondas e ventos.</p>

        <div className="alert-cards">
          {/* Alerta de Vento */}
          <div className={`alert-card ${alertColorMap[windAlert]} ${windAlert === 'perigoso' ? 'animate' : ''}`}>
            <h2><FaWind /> Alerta de Vento</h2>
            {alertIconMap[windAlert]}
            <p>Status: {windAlert.charAt(0).toUpperCase() + windAlert.slice(1)}</p>
            <p>O vento pode estar {windAlert === 'normal' ? 'calmo' : windAlert === 'medio' ? 'moderado' : 'forte'}.</p>
          </div>

          {/* Alerta de Onda */}
          <div className={`alert-card ${alertColorMap[waveAlert]} ${waveAlert === 'perigoso' ? 'animate' : ''}`}>
            <h2><FaWater /> Alerta de Onda</h2>
            {alertIconMap[waveAlert]}
            <p>Status: {waveAlert.charAt(0).toUpperCase() + waveAlert.slice(1)}</p>
            <p>As ondas estão {waveAlert === 'normal' ? 'baixas' : waveAlert === 'medio' ? 'moderadas' : 'altas'}.</p>
          </div>
        </div>

        <TableHome />
      </main>
    </div>
  );
};

export default HomePage;
