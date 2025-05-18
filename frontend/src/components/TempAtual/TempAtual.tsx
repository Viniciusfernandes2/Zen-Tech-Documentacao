import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface WeatherData {
  temp: string;
  reading_time: string;
}

const Card = styled.div`
  max-width: 350px;
  margin: 3rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #0077cc, #66ccff);
  color: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Temp = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const Label = styled.div`
  font-size: 1.2rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

const Time = styled.div`
  margin-top: 1rem;
  font-size: 0.95rem;
  opacity: 0.9;
`;

const TemperatureCard: React.FC = () => {
  const [latestData, setLatestData] = useState<WeatherData | null>(null);

  useEffect(() => {
    axios.get<WeatherData[]>('http://localhost:3006/maiortemp')
      .then((res) => {
        if (res.data.length > 0) {
          setLatestData(res.data[0]); // Assume o primeiro como o mais recente
        }
      })
      .catch((err) => console.error('Erro ao buscar dados:', err));
  }, []);

  return (
    <Card>
      {latestData ? (
        <>
          <Label>Temperatura Atual</Label>
          <Temp>{latestData.temp}°C</Temp>
          <Time>Atualizado em: {new Date(latestData.reading_time).toLocaleString()}</Time>
        </>
      ) : (
        <Label>Carregando dados...</Label>
      )}
    </Card>
  );
};

export default TemperatureCard;
