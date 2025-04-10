import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import "../styles/GraficoPage.css";
import Header from "../components/Header/header";
import { grafico } from "../services/graficoService";

const Graficos: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartLabels, setChartLabels] = useState<string[]>([]); // Labels do eixo X
  const [chartDataHumidity, setChartDataHumidity] = useState<number[]>([]); // Dados de umidade
  const [chartDataCharge, setChartDataCharge] = useState<number[]>([]); // Dados de carga
  const [chartDataWindSpeedInst, setChartDataWindSpeedInst] = useState<
    number[]
  >([]); // Velocidade do vento instantânea
  const [chartDataWindSpeedAvg, setChartDataWindSpeedAvg] = useState<number[]>(
    []
  ); // Velocidade do vento média
  const [chartDataWindDirInst, setChartDataWindDirInst] = useState<number[]>(
    []
  ); // Direção do vento instantânea

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await grafico("01-09-2024", "30-09-2024"); // Substitua pelas datas desejadas
        console.log("Dados recebidos:", response);

        // Processa os dados retornados
        const labels = response.map((item: any) => `${item.Date} ${item.Time}`); // Combina Date e Time
        const humidityData = response.map((item: any) =>
          parseFloat(item["Hum_%"].replace(",", "."))
        );
        const chargeData = response.map((item: any) =>
          parseFloat(item["Charge "].replace(",", "."))
        );
        const windSpeedInstData = response.map((item: any) =>
          parseFloat(item["WindSpeed_Inst "].replace(",", "."))
        );
        const windSpeedAvgData = response.map((item: any) =>
          parseFloat(item["WindSpeed_Avg "].replace(",", "."))
        );
        const windDirInstData = response.map((item: any) =>
          parseFloat(item["WindDir_Inst "].replace(",", "."))
        );

        // Atualiza os estados
        setChartLabels(labels);
        setChartDataHumidity(humidityData);
        setChartDataCharge(chargeData);
        setChartDataWindSpeedInst(windSpeedInstData);
        setChartDataWindSpeedAvg(windSpeedAvgData);
        setChartDataWindDirInst(windDirInstData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartLabels.length > 0) {
      const options: ApexOptions = {
        series: [
          {
            name: "Umidade (%)",
            type: "line",
            data: chartDataHumidity,
          },
          {
            name: "Carga",
            type: "line",
            data: chartDataCharge,
          },
          {
            name: "Velocidade do Vento (Inst)",
            type: "line",
            data: chartDataWindSpeedInst,
          },
          {
            name: "Velocidade do Vento (Média)",
            type: "line",
            data: chartDataWindSpeedAvg,
          },
          {
            name: "Direção do Vento (Inst)",
            type: "line",
            data: chartDataWindDirInst,
          },
        ],
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
            text: "Valores",
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
  }, [
    chartLabels,
    chartDataHumidity,
    chartDataCharge,
    chartDataWindSpeedInst,
    chartDataWindSpeedAvg,
    chartDataWindDirInst,
  ]);

  return (
    <>
      <Header />
      <div className="grafico-container">
        <div id="chart" ref={chartRef} />
      </div>
    </>
  );
};

export default Graficos;
