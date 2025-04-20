import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

type Props = {
  campo: string; // Ex: "WindSpeed_Inst " ou "WindDir_Avg "
  tituloY: string;
  nomeGraficoReserv: string;
  nomeGraficoColinas: string;
  nomeGrafico: string;
  fetchReserv: (inicio: string, fim: string) => Promise<any[]>;
  fetchColinas: (inicio: string, fim: string) => Promise<any[]>;
};

const GraficoApex: React.FC<Props> = ({
  campo,
  tituloY,
  nomeGraficoReserv,
  nomeGraficoColinas,
  nomeGrafico,
  fetchReserv,
  fetchColinas,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartDataReserv, setChartDataReserv] = useState<number[]>([]);
  const [chartDataColinas, setChartDataColinas] = useState<number[]>([]);
  const [checkedOptions, setCheckedOptions] = useState({
    station: true,
    colinas: false,
  });

  const allSelected = checkedOptions.station && checkedOptions.colinas;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservResponse = await fetchReserv("01-09-2024", "30-09-2024");
        const colinasResponse = await fetchColinas("01-09-2024", "30-09-2024");

        const reservLabels = reservResponse.map(
          (item: any) => `${item.Date} ${item.Time}`
        );
        const reservData = reservResponse.map((item: any) =>
          parseFloat(String(item[campo] ?? "0").replace(",", "."))
        );

        const colinasLabels = colinasResponse.map(
          (item: any) => `${item.Date} ${item.Time}`
        );
        const colinasData = colinasResponse.map((item: any) =>
          parseFloat(String(item[campo] ?? "0").replace(",", "."))
        );

        setChartLabels(reservLabels.slice(0, 10));
        setChartDataReserv(reservData.slice(0, 10));
        setChartDataColinas(colinasData.slice(0, 10));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [campo, fetchReserv, fetchColinas]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setCheckedOptions({
      station: checked,
      colinas: checked,
    });
  };

  const getSeriesData = () => {
    const series = [];
    if (checkedOptions.station) {
      series.push({
        name: nomeGraficoReserv,
        type: "line",
        data: chartDataReserv,
      });
    }
    if (checkedOptions.colinas) {
      series.push({
        name: nomeGraficoColinas,
        type: "line",
        data: chartDataColinas,
      });
    }
    return series;
  };

  useEffect(() => {
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
          categories: chartLabels,
        },
        yaxis: {
          title: {
            text: tituloY,
          },
        },
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

        return () => {
          chart.destroy();
        };
      }
    }
  }, [chartLabels, chartDataReserv, chartDataColinas, checkedOptions]);

  return (
    <div className="grafico-container">
      <h3>{nomeGrafico}</h3>
      <div className="controls">
        <label>
          <input
            type="checkbox"
            name="station"
            checked={checkedOptions.station}
            onChange={handleCheckboxChange}
          />
          Reservatório
        </label>
        <label>
          <input
            type="checkbox"
            name="colinas"
            checked={checkedOptions.colinas}
            onChange={handleCheckboxChange}
          />
          Colinas
        </label>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />
          Selecionar Todos
        </label>
      </div>
      <div id="chart" ref={chartRef} />
    </div>
  );
};

export default GraficoApex;
