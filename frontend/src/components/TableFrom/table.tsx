import { useEffect, useState } from "react";
import { tableColinas } from "../../services/tableService";
import "./table.css";

interface DadoMeteorologico {
  Date: string;
  Time: string;
  Temp_C: string;
  Hum_: string;
  Press_Bar: string;
  TempCabine_C: string;
  Charge: string;
  SR_Wm2: string;
  WindPeak_ms: string;
  WindSpeed_Inst: string;
  WindSpeed_Avg: string;
  WindDir_Inst: string;
  WindDir_Avg: string;
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

  return (
    <div>
      <h2>Dados Meteorológicos - Estação Colinas</h2>

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
                <th>Pressão (Bar)</th>
                <th>Temp Cabine</th>
                <th>Carga</th>
                <th>Radiação (W/m²)</th>
                <th>Rajada Vento</th>
                <th>Vento Inst.</th>
                <th>Vento Méd.</th>
                <th>Dir. Inst.</th>
                <th>Dir. Méd.</th>
              </tr>
            </thead>
            <tbody>
              {dadosPaginados.map((dado, index) => (
                <tr key={index}>
                  <td>{dado.Date}</td>
                  <td>{dado.Time}</td>
                  <td>{dado.Temp_C}</td>
                  <td>{dado.Hum_}</td>
                  <td>{dado.Press_Bar}</td>
                  <td>{dado.TempCabine_C}</td>
                  <td>{dado.Charge}</td>
                  <td>{dado.SR_Wm2}</td>
                  <td>{dado.WindPeak_ms}</td>
                  <td>{dado.WindSpeed_Inst}</td>
                  <td>{dado.WindSpeed_Avg}</td>
                  <td>{dado.WindDir_Inst}</td>
                  <td>{dado.WindDir_Avg}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="botoesPaginacao">
            <button className="botaoPaginacao" onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaAtual === 1 || dados.length === 0}>
              Anterior
            </button>
            <span className="paginaInfo">
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              className="botaoPaginacao"
              onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas || dados.length === 0}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}