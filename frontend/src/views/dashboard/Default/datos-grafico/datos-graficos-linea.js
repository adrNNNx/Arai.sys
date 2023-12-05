//import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { apiUrlGetVent, getRequest } from 'services';
//import { startOfWeek, differenceInCalendarWeeks } from 'date-fns';
import Chart from 'react-apexcharts';

const GraficoLineaVentas = () => {
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
        text: 'Ventas realizadas'
      },
      xaxis: {
        categories: [] // Aquí se colocarán los nombres de los días
      },
      yaxis: {
        title: {
          text: 'Cantidad Vendida'
        }
      }
    }
  });

  // Función para obtener el número de semana de una fecha
/*   const getWeek = (date) => {
    const startOfISOWeek = startOfWeek(new Date(date), { weekStartsOn: 1 }); // 1 for Monday
    const currentDate = new Date(date);
    const weekNumber = differenceInCalendarWeeks(currentDate, startOfISOWeek);
    return weekNumber + 1; // Ajustamos el número de semana para comenzar desde 1
  }; */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlGetVent);
        const chartDataSeries = {};
        // Agrupamos la cantidad vendida por día
        response.data.forEach((item) => {
          const date = new Date(item.fech_ven);
          const day = date.toISOString().split('T')[0]; // Obtenemos la fecha en formato YYYY-MM-DD
          const formattedDay = day.split('-').reverse().join('-'); // Cambiamos el formato a DD-MM-YY
          chartDataSeries[formattedDay] = (chartDataSeries[formattedDay] || 0) + parseInt(item.cantidad_items);
        });
  
        const series = [];
        const categories = [];
        Object.keys(chartDataSeries).sort().forEach((day) => {
          series.push(chartDataSeries[day]);
          categories.push(day);
        });
  
        setChartData({
          ...chartData,
          series: [
            {
              name: 'Cantidad Vendida',
              data: series
            }
          ],
          options: {
            ...chartData.options,
            xaxis: {
              categories: categories
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
