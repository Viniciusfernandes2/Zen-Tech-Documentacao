import React, { useEffect, useState } from "react";
import { tableColinas } from "../../services/tableService";
import "./ClimaSemana.css";

interface DadoMeteorologico {
  id: number;
  temp: string;
  reading_time: string;
}

interface TempDia {
  date: string;
  temp_max: number;
  temp_min: number;
}

const WeatherIconByTemp: React.FC<{ tempMax: number }> = ({ tempMax }) => {
  if (tempMax >= 30)
    return <img src="/img/sol-icon.png" alt="Quente" className="semana-icon" />;
  if (tempMax >= 20)
    return <img src="/img/nublado-icon.png" alt="Ameno" className="semana-icon" />;
  if (tempMax >= 10)
    return <img src="/img/chuva-icon.png" alt="Frio" className="semana-icon" />;
  return <img src="/img/chuvaforte-icon.png" alt="Muito frio" className="semana-icon" />;
};

const ClimaSemana: React.FC = () => {
  const [tempDias, setTempDias] = useState<TempDia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const dados: DadoMeteorologico[] = await tableColinas();

        const agrupadoPorDia: { [key: string]: number[] } = {};
        dados.forEach(({ temp, reading_time }) => {
          const date = new Date(reading_time).toISOString().slice(0, 10);
          const tempNum = parseFloat(temp);
          if (!agrupadoPorDia[date]) agrupadoPorDia[date] = [];
          agrupadoPorDia[date].push(tempNum);
        });

        const tempDiasArray: TempDia[] = Object.entries(agrupadoPorDia).map(
          ([date, temps]) => ({
            date,
            temp_max: Math.max(...temps),
            temp_min: Math.min(...temps),
          })
        );

        tempDiasArray.sort((a, b) => (a.date < b.date ? 1 : -1));
        setTempDias(tempDiasArray);
      } catch (err) {
        setError("Erro ao carregar histórico de temperaturas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando histórico de temperaturas...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (tempDias.length === 0) return <p>Nenhum dado disponível.</p>;

  return (
    <div className="forecast-container">
  {tempDias.map(({ date, temp_max, temp_min }) => (
    <div key={date} className="daily-max-temp-block">
      <div className="date">
        {new Date(date).toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </div>
      <WeatherIconByTemp tempMax={temp_max} />
      <div className="max-temp">
        Máx: <strong>{temp_max.toFixed(1)}°C</strong>
      </div>
      <div className="max-temp">
        Mín: <strong>{temp_min.toFixed(1)}°C</strong>
      </div>
    </div>
  ))}
</div>

  );
};

export default ClimaSemana;
