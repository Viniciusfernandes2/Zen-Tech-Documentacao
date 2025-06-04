import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

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
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchData("01-09-2024", "30-09-2024");

        const labels = response.map((item: any) =>
          new Date(item.reading_time).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        const data = response.map((item: any) =>
          parseFloat(String(item[campo] ?? "0").replace(",", "."))
        );

        setChartLabels(labels.slice(0, 10));
        setChartData(data.slice(0, 10));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetch();
  }, [campo, fetchData]);

  useEffect(() => {
    if (chartLabels.length > 0) {
      const options: ApexOptions = {
        series: [
          {
            name: nomeEstacao,
            type: "line",
            data: chartData,
          },
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: { enabled: false },
          toolbar: {
            tools: {
              download: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
            },
          },
        },
        stroke: { curve: "smooth" },
        xaxis: { categories: chartLabels },
        yaxis: { title: { text: tituloY } },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (value: number): string =>
              value !== undefined && value !== null ? value.toFixed(2) : "N/A",
          },
        },
      };

      if (chartRef.current) {
        const chart = new ApexCharts(chartRef.current, options);
        chart.render();
        return () => chart.destroy();
      }
    }
  }, [chartLabels, chartData]);

  return (
    <div className="grafico-container">
      <h3>{nomeGrafico}</h3>
      <div id="chart" ref={chartRef} />
    </div>
  );
};

export default GraficoApex;