//import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { apiUrlGetVent, getRequest } from 'services';
import Chart from 'react-apexcharts';

const GraficoLineaVentas = () => {
  //const theme = useTheme();
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 2, 3]
      },
      title: {
        text: 'Cantidad Vendida por Semana'
      },
      xaxis: {
        categories: [] // Aquí se colocarán los nombres de las semanas
      },
      yaxis: {
        title: {
          text: 'Cantidad Vendida'
        }
      }
    }
  });

  // Función para obtener el número de semana de una fecha
  const getWeek = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetVent);
        const chartDataSeries = {};
        // Agrupamos la cantidad vendida por semana
        response.data.forEach((item) => {
          const week = getWeek(new Date(item.fech_ven));
          chartDataSeries[week] = (chartDataSeries[week] || 0) + parseInt(item.cantidad_items);
        });

        setChartData({
          ...chartData,
          series: [
            {
              name: 'Cantidad Vendida',
              data: Object.values(chartDataSeries)
            }
          ],
          options: {
            ...chartData.options,
            xaxis: {
              categories: Object.keys(chartDataSeries).map((week) => `Semana ${week}`)
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="line" />
    </div>
  );
};

export default GraficoLineaVentas;
