import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IconsApi.css"; // certifique-se de ter esse CSS

interface Props {
  lat: number;
  lon: number;
}

const IconsApi: React.FC<Props> = ({ lat, lon }) => {
  const [condicao, setCondicao] = useState("");

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    if (!apiKey) {
      console.error("API key do OpenWeather não definida no .env.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;

    axios
      .get(url)
      .then((res) => {
        const mainCondition = res.data.weather[0].main; // Ex: Clear, Clouds, Rain
        setCondicao(mainCondition);
      })
      .catch((err) => console.error("Erro ao buscar condição do tempo:", err));
  }, [lat, lon]);

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clear":
        return <img src="/img/sol-icon.png" alt="Ensolarado" className="api-icon" />;
      case "Clouds":
        return <img src="/img/nublado-icon.png" alt="Nublado" className="api-icon" />;
      case "Rain":
      case "Drizzle":
        return <img src="/img/chuva-icon.png" alt="Chuva" className="api-icon" />;
      case "Thunderstorm":
        return <img src="/img/chuvaforte-icon.png" alt="Chuva Forte" className="api-icon" />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <img src="/img/nublado-icon.png" alt="Neblina" className="api-icon" />;
    }
  };

  return <>{getWeatherIcon(condicao)}</>;
};

export default IconsApi;
