import React, { JSX, useEffect, useState } from "react";
import Header from "../components/Header/header";
import "../styles/HomePage.css";
import TableHome from "../components/TempAtual/TempAtual";
import { Alert } from "../services/graficoService";
import IconeSobre from "../components/SobreForm/SobreIcon";
import { FaWind, FaWater } from "react-icons/fa";
import { MdWarning, MdCheckCircle, MdReportProblem, MdError, MdDangerous } from "react-icons/md";

// Tipos para os dados de alerta
type AlertType = 'normal' | 'amarelo' | 'laranja' | 'vermelho' | 'critico';

// Mapeamento de cor por alerta
const alertColorMap: Record<AlertType, string> = {
  normal: 'green',
  amarelo: 'yellow',
  laranja: 'orange',
  vermelho: 'red',
  critico: 'purple',
};

// Mapeamento de ícone por alerta
const alertIconMap: Record<AlertType, JSX.Element> = {
  normal: <MdCheckCircle size={24} />,
  amarelo: <MdReportProblem size={24} color="#FFD600" />,
  laranja: <MdWarning size={24} color="#FF9800" />,
  vermelho: <MdError size={24} color="#F44336" />,
  critico: <MdDangerous size={24} color="#8e24aa" />,
};

const HomePage: React.FC = () => {
  const [windAlert, setWindAlert] = useState<AlertType>('normal');
  const [waveAlert, setWaveAlert] = useState<AlertType>('normal');

  // Função para determinar o alerta baseado na velocidade do vento (em m/s)
  function getWindAlertType(speed: number): AlertType {
    if (speed < 10) return 'normal'; // até 9,9 m/s
    if (speed < 17) return 'amarelo'; // 10 a 16,9 m/s
    if (speed < 25) return 'laranja'; // 17 a 24,9 m/s
    if (speed < 32) return 'vermelho'; // 25 a 31,9 m/s
    return 'critico'; // 32 m/s ou mais
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Alert();

        // Se a API retorna um array, pegue o mais recente (primeiro elemento)
        const latest = Array.isArray(data) ? data[0] : data;

        const windAvg = parseFloat(latest.wind_avg); // m/s
        const windPeak = parseFloat(latest.wind_peak); // m/s

        setWindAlert(getWindAlertType(windPeak));
        setWaveAlert(getWindAlertType(windAvg));
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
        <div className="alert-cards">
          {/* Alerta de Vento */}
          <div className={`alert-card ${alertColorMap[windAlert]} ${windAlert === 'critico' ? 'animate' : ''}`}>
            <h2><FaWind /> Alerta de Vento</h2>
            {alertIconMap[windAlert]}
            <p>Status: {windAlert.charAt(0).toUpperCase() + windAlert.slice(1)}</p>
            <p>
              {windAlert === 'normal' && "Vento calmo."}
              {windAlert === 'amarelo' && "Atenção para ventos fortes."}
              {windAlert === 'laranja' && "Risco de danos leves."}
              {windAlert === 'vermelho' && "Risco significativo de danos."}
              {windAlert === 'critico' && "Risco extremo! Evite qualquer atividade ao ar livre."}
            </p>
          </div>

          {/* Alerta de Onda */}
          <div className={`alert-card ${alertColorMap[waveAlert]} ${waveAlert === 'critico' ? 'animate' : ''}`}>
            <h2><FaWater /> Alerta de Onda</h2>
            {alertIconMap[waveAlert]}
            <p>Status: {waveAlert.charAt(0).toUpperCase() + waveAlert.slice(1)}</p>
            <p>
              {waveAlert === 'normal' && "Ondas baixas."}
              {waveAlert === 'amarelo' && "Ondas moderadas, atenção."}
              {waveAlert === 'laranja' && "Ondas fortes, risco de danos leves."}
              {waveAlert === 'vermelho' && "Ondas muito fortes, risco significativo."}
              {waveAlert === 'critico' && "Ondas extremas! Risco máximo."}
            </p>
          </div>
        </div>

        <TableHome />
        <IconeSobre />
      </main>
    </div>
  );
};

export default HomePage;
