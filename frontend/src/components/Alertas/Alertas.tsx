import React, { useEffect, useState } from "react";
import { FaWind, FaWater } from "react-icons/fa";
import {
  MdWarning,
  MdCheckCircle,
  MdReportProblem,
  MdError,
  MdDangerous,
} from "react-icons/md";
import { Alert } from "../../services/graficoService";
import "./Alertas.css";

type AlertType = "normal" | "amarelo" | "laranja" | "vermelho" | "critico";

const alertColorClass: Record<AlertType, string> = {
  normal: "green",
  amarelo: "orange",
  laranja: "orange",
  vermelho: "red",
  critico: "red animate",
};

const alertIcons: Record<AlertType, React.ReactElement> = {
  normal: <MdCheckCircle size={24} />,
  amarelo: <MdReportProblem size={24} />,
  laranja: <MdWarning size={24} />,
  vermelho: <MdError size={24} />,
  critico: <MdDangerous size={24} />,
};

const Alertas: React.FC = () => {
  const [windAlert, setWindAlert] = useState<AlertType>("normal");
  const [waveAlert, setWaveAlert] = useState<AlertType>("normal");

  function getAlertType(speed: number): AlertType {
    if (speed < 10) return "normal";
    if (speed < 17) return "amarelo";
    if (speed < 25) return "laranja";
    if (speed < 32) return "vermelho";
    return "critico";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Alert();
        const latest = Array.isArray(data) ? data[0] : data;
        const windAvg = parseFloat(latest.wind_avg);
        const windPeak = parseFloat(latest.wind_peak);
        setWindAlert(getAlertType(windPeak));
        setWaveAlert(getAlertType(windAvg));
      } catch (error) {
        console.error("Erro ao buscar dados de vento:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="alert-cards">
      <div className={`alert-card ${alertColorClass[windAlert]}`}>
        <h2>
          <FaWind /> Alerta de Vento
        </h2>
        {alertIcons[windAlert]}
        <p>Status: {windAlert.charAt(0).toUpperCase() + windAlert.slice(1)}</p>
        <p>
          {windAlert === "normal" && "Vento calmo."}
          {windAlert === "amarelo" && "Atenção para ventos fortes."}
          {windAlert === "laranja" && "Risco de danos leves."}
          {windAlert === "vermelho" && "Risco significativo de danos."}
          {windAlert === "critico" && "Risco extremo! Evite atividades ao ar livre."}
        </p>
      </div>

      <div className={`alert-card ${alertColorClass[waveAlert]}`}>
        <h2>
          <FaWater /> Alerta de Onda
        </h2>
        {alertIcons[waveAlert]}
        <p>Status: {waveAlert.charAt(0).toUpperCase() + waveAlert.slice(1)}</p>
        <p>
          {waveAlert === "normal" && "Ondas baixas."}
          {waveAlert === "amarelo" && "Ondas moderadas, atenção."}
          {waveAlert === "laranja" && "Ondas fortes, risco de danos leves."}
          {waveAlert === "vermelho" && "Ondas muito fortes, risco significativo."}
          {waveAlert === "critico" && "Ondas extremas! Risco máximo."}
        </p>
      </div>
    </div>
  );
};

export default Alertas;
