import { useEffect, useState } from "react";
import { tableColinas } from "../../services/tableService";
import "./table.css";

interface DadoMeteorologico {
  id: number;
  temp: string;
  hum: string;
  bar: string;
  cab_temp: string;
  bat_volts: string;
  uv_level: string;
  wind_peak: string;
  wind_rt: string;
  wind_avg: string;
  wind_dir_rt: string;
  wind_dir_avg: string;
  reading_time: string;
}

const ITENS_POR_PAGINA = 20;

export default function Table() {
  const [dados, setDados] = useState<DadoMeteorologico[]>([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const totalPaginas = Math.max(1, Math.ceil(dados.length / ITENS_POR_PAGINA));

  useEffect(() => {
    async function buscarDados() {
      setCarregando(true);
      setErro("");

      try {
        const resposta = await tableColinas();
        setDados(resposta);
      } catch (err) {
        setErro("Erro ao carregar os dados.");
      } finally {
        setCarregando(false);
      }
    }

    buscarDados();
  }, []);

  const dadosPaginados = dados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  const exportarCSV = () => {
    const cabecalhos = [
      'Data', 'Hora', 'Temp (°C)', 'Umidade (%)', 'Pressão (hPa)', 'Temp Cabine (°C)', 
      'Bateria (V)', 'UV', 'Rajada Vento', 'Vento Inst.', 'Vento Méd.', 'Dir. Inst.', 'Dir. Méd.'
    ];

    const linhas = dados.map(dado => {
      const data = new Date(dado.reading_time);
      const dataStr = data.toLocaleDateString();
      const horaStr = data.toLocaleTimeString();
      return [
        dataStr, horaStr, dado.temp, dado.hum, dado.bar, dado.cab_temp, 
        dado.bat_volts, dado.uv_level, dado.wind_peak, dado.wind_rt, 
        dado.wind_avg, dado.wind_dir_rt, dado.wind_dir_avg
      ];
    });

    const csvConteudo = [cabecalhos, ...linhas].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvConteudo], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_meteorologicos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Título fixo logo abaixo do header */}
      <h2 className="tituloFixo">Dados Meteorológicos</h2>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {!carregando && !erro && dados.length === 0 && (
        <p>Nenhum dado encontrado.</p>
      )}

      {!carregando && !erro && dados.length > 0 && (
        <>
          <table className="tabela">
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Temp (°C)</th>
                <th>Umidade (%)</th>
                <th>Pressão (hPa)</th>
                <th>Temp Cabine (°C)</th>
                <th>Bateria (V)</th>
                <th>UV</th>
                <th>Rajada Vento</th>
                <th>Vento Inst.</th>
                <th>Vento Méd.</th>
                <th>Dir. Inst.</th>
                <th>Dir. Méd.</th>
              </tr>
            </thead>
            <tbody>
              {dadosPaginados.map((dado, index) => {
                const data = new Date(dado.reading_time);
                const dataStr = data.toLocaleDateString();
                const horaStr = data.toLocaleTimeString();

                return (
                  <tr key={index}>
                    <td>{dataStr}</td>
                    <td>{horaStr}</td>
                    <td>{dado.temp}</td>
                    <td>{dado.hum}</td>
                    <td>{dado.bar}</td>
                    <td>{dado.cab_temp}</td>
                    <td>{dado.bat_volts}</td>
                    <td>{dado.uv_level}</td>
                    <td>{dado.wind_peak}</td>
                    <td>{dado.wind_rt}</td>
                    <td>{dado.wind_avg}</td>
                    <td>{dado.wind_dir_rt}</td>
                    <td>{dado.wind_dir_avg}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="botoesPaginacao">
            <div className="paginasEExportacao">
              <button
                className="botaoPaginacao"
                onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}
                disabled={paginaAtual === 1 || dados.length === 0}
              >
                Anterior
              </button>
              <span className="paginaInfo">
                Página {paginaAtual} de {totalPaginas}
              </span>
              <button
                className="botaoPaginacao"
                onClick={() =>
                  setPaginaAtual(p => Math.min(p + 1, totalPaginas))
                }
                disabled={paginaAtual === totalPaginas || dados.length === 0}
              >
                Próxima
              </button>
            </div>

            {/* Botão para exportar os dados em CSV */}
            <div className="exportarCsv">
              <button className="botaoExportar" onClick={exportarCSV}>
                Baixar CSV
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
