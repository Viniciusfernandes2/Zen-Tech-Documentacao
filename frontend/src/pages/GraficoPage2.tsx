import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import "../styles/GraficoPage.css";
import Header from "../components/Header/header";
import { graficoStation, graficoColinas } from "../services/graficoService";

const Graficos2: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartLabels, setChartLabels] = useState<string[]>([]); // Labels do eixo X
  const [chartDataStation, setChartDataStation] = useState<number[]>([]); // Dados de WindSpeedAvg para Station
  const [chartDataColinas, setChartDataColinas] = useState<number[]>([]); // Dados de WindSpeedAvg para Colinas
  const [selectedData, setSelectedData] = useState<string>("station"); // Opção selecionada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationResponse = await graficoStation("01-09-2024", "30-09-2024");
        const colinasResponse = await graficoColinas("01-09-2024", "30-09-2024");
    
        console.log("Station Response:", stationResponse);
        console.log("Colinas Response:", colinasResponse);
    
        // Processa os dados retornados
        const stationLabels = stationResponse.map(
          (item: any) => `${item.Date} ${item.Time}`
        );
        const stationData = stationResponse.map((item: any) =>
          parseFloat(String(item["WindSpeed_Inst "] ?? "0").replace(",", "."))
        );
    
        const colinasLabels = colinasResponse.map(
          (item: any) => `${item.Date} ${item.Time}`
        );
        const colinasData = colinasResponse.map((item: any) =>
          parseFloat(String(item["WindSpeed_Inst "] ?? "0").replace(",", "."))
        );
    
        console.log("Station Labels:", stationLabels);
        console.log("Station Data:", stationData);
        console.log("Colinas Labels:", colinasLabels);
        console.log("Colinas Data:", colinasData);
    
        // Atualiza os estados
        setChartLabels(stationLabels); // Usa os labels de Station como base
        setChartDataStation(stationData);
        setChartDataColinas(colinasData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getSeriesData = () => {
      if (selectedData === "station") {
        return [
          {
            name: "Station - WindSpeed_Inst",
            type: "line",
            data: chartDataStation,
          },
        ];
      } else if (selectedData === "colinas") {
        return [
          {
            name: "Colinas - WindSpeed_Inst",
            type: "line",
            data: chartDataColinas,
          },
        ];
      } else if (selectedData === "both") {
        return [
          {
            name: "Station - WindSpeed_Inst",
            type: "line",
            data: chartDataStation,
          },
          {
            name: "Colinas - WindSpeed_Inst",
            type: "line",
            data: chartDataColinas,
          },
        ];
      }
      return [];
    };

    if (chartLabels.length > 0) {
      const options: ApexOptions = {
        series: getSeriesData(),
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: chartLabels, // Define as labels no eixo X
        },
        yaxis: {
          title: {
            text: "WindSpeed_Inst",
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (value: number): string => {
              return value !== undefined && value !== null
                ? value.toFixed(2)
                : "N/A";
            },
          },
        },
      };

      if (chartRef.current) {
        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
          chart.destroy();
        };
      }
    }
  }, [chartLabels, chartDataStation, chartDataColinas, selectedData]);

  return (
    <>
      <Header />
      <div className="grafico-container">
        <div className="controls">
          <label>
            <input
              type="radio"
              name="dataOption"
              value="station"
              checked={selectedData === "station"}
              onChange={() => setSelectedData("station")}
            />
            Station
          </label>
          <label>
            <input
              type="radio"
              name="dataOption"
              value="colinas"
              checked={selectedData === "colinas"}
              onChange={() => setSelectedData("colinas")}
            />
            Colinas
          </label>
          <label>
            <input
              type="radio"
              name="dataOption"
              value="both"
              checked={selectedData === "both"}
              onChange={() => setSelectedData("both")}
            />
            Ambos
          </label>
        </div>
        <div id="chart" ref={chartRef} />
      </div>
    </>
  );
};

export default Graficos2;