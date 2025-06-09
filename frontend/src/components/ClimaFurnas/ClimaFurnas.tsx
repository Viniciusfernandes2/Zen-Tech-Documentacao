import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClimaFurnas.css";
import { FaTemperatureHigh, FaTint } from "react-icons/fa";
import { WiStrongWind } from "react-icons/wi";

// Ícones baseados na temperatura
const WeatherIconByTemp: React.FC<{ tempMax: number }> = ({ tempMax }) => {
  if (tempMax >= 30)
    return <img src="/img/sol-icon.png" alt="Quente" className="api-icon" />;
  if (tempMax >= 20)
    return <img src="/img/nublado-icon.png" alt="Ameno" className="api-icon" />;
  if (tempMax >= 10)
    return <img src="/img/chuva-icon.png" alt="Frio" className="api-icon" />;
  return <img src="/img/chuvaforte-icon.png" alt="Muito frio" className="api-icon" />;
};

interface WeatherData {
  temp: string;
  hum: string;
  bar: string;
  wind_avg: string;
  wind_dir_avg: string;
  reading_time: string;
}

const WeatherCardFurnas: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    axios
      .get<WeatherData[]>("http://localhost:3006/maiortemp")
      .then((res) => {
        if (res.data.length > 0) setData(res.data[0]);
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  if (!data) return <div className="card">Carregando dados...</div>;

  const hora = new Date(data.reading_time).toLocaleTimeString("pt-BR");
  const tempMax = parseFloat(data.temp);

  return (
    <div className="weather-card">
      <div className="title-row">
        <h1>
          Clima Atual
          <div className="icon-weather">
            <WeatherIconByTemp tempMax={tempMax} />
          </div>
        </h1>
        <h2>Represa de Furnas</h2>
      </div>

      <div className="temp-container">
        <p className="temp">
          <span className="temp-icon"><FaTemperatureHigh /></span>
          <span className="temp-value">{data.temp}°C</span>
        </p>
      </div>

      <div className="weather-info-row">
        <p className="info">
          <FaTint /> Umidade: {data.hum}%
        </p>
        <p className="info">
          <WiStrongWind /> Vento: {data.wind_avg} km/h ({data.wind_dir_avg})
        </p>
        <p className="timestamp">Atualizado às {hora}</p>
      </div>
    </div>
  );
};

export default WeatherCardFurnas;
