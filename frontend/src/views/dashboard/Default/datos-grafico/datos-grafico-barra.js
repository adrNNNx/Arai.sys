import { useEffect, useState } from 'react';
import { apiUrlExistenciaProd, getRequest } from 'services';

const DatosGraficos = () => {
  const [existenciaLista, setExistencia] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequest(apiUrlExistenciaProd);
        setExistencia(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  let nombresCategoria;
  let stock;
  let stockTotal;

  if (existenciaLista) {
    //Mapemos los nombres y lo limitamos hasta solo 12 elementos
    nombresCategoria = existenciaLista.slice(0, 12).map((exitencia_list) => exitencia_list.categoria);
    stock = existenciaLista.slice(0, 12).map((exitencia_list) => exitencia_list.existencia);
    stockTotal = existenciaLista.slice(0, 12).reduce((total, existencia_list) => total + Number(existencia_list.existencia), 0);
  }
  return {
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
        animations: {
          enabled: false,
          easing: 'easein', // Tipo de animación
          speed: 800, // Duración de la animación en milisegundos
          animateGradually: {
            enabled: true,
            delay: 150 // Retraso de la animación en milisegundos
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350 // Velocidad de la animación dinámica en milisegundos
          }
        },
      },
      colors: ['#F44336'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      xaxis: {
        type: 'category',
        categories: nombresCategoria
      },
      legend: {
        show: true,
        fontSize: '14px',
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: [
      {
        name: 'Existencia',
        data: stock,
      }
    ],
    totalStock: stockTotal
  };
};

export default DatosGraficos;
