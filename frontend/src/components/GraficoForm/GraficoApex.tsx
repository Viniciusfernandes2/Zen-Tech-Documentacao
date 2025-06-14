import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type Props = {
  campo: string;
  tituloY: string;
  nomeGrafico: string;
  nomeEstacao: string;
  fetchData: (inicio: string, fim: string) => Promise<any[]>;
};

const GraficoApex: React.FC<Props> = ({
  campo,
  tituloY,
  nomeGrafico,
  nomeEstacao,
  fetchData,
}) => {
  const [dados, setDados] = useState<any[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string>(new Date().toISOString().split('T')[0]);
  const [carregando, setCarregando] = useState(false);

  const filtrarDadosPorTempo = () => {
    if (!dados.length) return [];

    const agora = new Date().getTime();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const dataSelecionadaObj = new Date(dataSelecionada + 'T00:00:00');
    const inicioDoDia = new Date(dataSelecionadaObj.setHours(0, 0, 0, 0)).getTime();
    const fimDoDia = new Date(dataSelecionadaObj.setHours(23, 59, 59, 999)).getTime();

    const ehHoje = dataSelecionadaObj.getTime() === hoje.getTime();
    const tempoLimite = ehHoje ? agora : fimDoDia;

    return dados
      .filter(item => 
        item.timestamp >= inicioDoDia && 
        item.timestamp <= tempoLimite
      )
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const buscarDados = async () => {
    setCarregando(true);
    try {
      const dataSelecionadaObj = new Date(dataSelecionada + 'T00:00:00');
      const dataFormatada = dataSelecionadaObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).split('/').join('-');

      const response = await fetchData(dataFormatada, dataFormatada);
      
      const dadosFormatados = response.map(item => {
        const dataLeitura = new Date(item.reading_time);
        return {
          timestamp: dataLeitura.getTime(),
          data: dataLeitura.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          valor: parseFloat(String(item[campo] ?? "0").replace(",", "."))
        };
      });

      dadosFormatados.sort((a, b) => a.timestamp - b.timestamp);
      setDados(dadosFormatados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDados();
  }, [dataSelecionada]);

  const dadosFiltrados = filtrarDadosPorTempo();

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataSelecionada(event.target.value);
  };

  const getIntervaloEixoX = () => {
    const quantidadeDados = dadosFiltrados.length;
    if (quantidadeDados <= 10) return 0;
    if (quantidadeDados <= 30) return 1;
    if (quantidadeDados <= 60) return 2;
    return 5;
  };

  return (
    <div style={{ paddingBottom: '10px' }}>
      <div className="grafico-apex-container">
        <h3>{nomeGrafico}</h3>
        
        <div className="grafico-apex-filtros">
          <div className="grafico-apex-filtro-data">
            <label htmlFor="dataSelecionada">Data:</label>
            <input
              type="date"
              id="dataSelecionada"
              value={dataSelecionada}
              onChange={handleDataChange}
            />
          </div>
        </div>

        {carregando ? (
          <div className="grafico-apex-mensagem">Carregando dados...</div>
        ) : dadosFiltrados.length === 0 ? (
          <div className="grafico-apex-mensagem">Nenhum dado disponível para o período selecionado</div>
        ) : (
          <div className="grafico-apex-area">
            <ResponsiveContainer>
              <LineChart
                data={dadosFiltrados}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis 
                  dataKey="data" 
                  tick={{ fontSize: 12, fill: '#495057' }}
                  interval={getIntervaloEixoX()}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#6c757d"
                  minTickGap={10}
                />
                <YAxis 
                  label={{ 
                    value: tituloY, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#495057' }
                  }}
                  stroke="#6c757d"
                />
                <Tooltip 
                  formatter={(value: number) => [value.toFixed(2), 'Valor']}
                  labelFormatter={(label) => `Data/Hora: ${label}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name={nomeEstacao}
                  stroke="#007bff"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: '#007bff',
                    stroke: '#ffffff',
                    strokeWidth: 2
                  }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficoApex;
