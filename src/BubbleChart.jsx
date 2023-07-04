import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'
const BubbleChart = ({ data }) => {
  const chartContainer = useRef(null);
  Chart.register(ChartDataLabels);
  useEffect(() => {
    let myChart = null;
    if (chartContainer && chartContainer.current) {
      const context = chartContainer.current.getContext('2d');
      const chartData = {
        datasets: [
          {
            label: 'Bubble Chart',
            data: data.map((item) => ({
              x: item.DaysSinceOnboarding,
              y: item.NumberOfCorridors,
              r: item.NumberOfCorridors > 25? item.NumberOfCorridors : 25 ,
              partner: item.partner,
              hoverRadius: 12,
            })),
            backgroundColor:
            data.map((item) => ( item.NumberOfCorridors > 50 ? '#74D4AC' : item.NumberOfCorridors > 25 ? '#F0DF73' : '#FF9D99')),
          },
        ],
      };
      const chartOptions = {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            ticks: {
              stepSize: 12,
            },
            title: {
              display: true,
              text: 'Days Since Onboarding',
            },
            border: {
              dash: [12,4],
          }, 
          },
          y: {
            type: 'linear',
            position: 'left',
            ticks: {
              beginAtZero: true,
              stepSize: 25,
            },
            title: {
              display: true,
              text: 'Number Of Corridors',
            },
            border: {
              dash: [12,4],
          }, 
          },
        },
        plugins:{
          legend:{
            display:false,
          },    
          tooltip:{
            backgroundColor: '#ffffff',
            callbacks: {
              label: function(context){
                console.log(context)
                return `${context.raw.partner}   ads`
              },
              afterLabel: function(context){
                return `asdas`
              },
              labelPointStyle: function(context) {
                return {
                    pointStyle: 'triangle',
                    rotation: 0
                };
            },
              labelTextColor: function(context) {
                  return '#543453';

              },
          },},
          datalabels: {
            anchor: 'center',
            align: 'center',
            formatter: (ctx) => (ctx.partner[0]+ctx.partner.split(' ')[1]),
            font: {
                weight: 'bold',
                size: 14
            },
            color: "black",
        }
        }
      };
       myChart = new Chart(context, {
        type: 'bubble',
        data: chartData,
        options: chartOptions,
      });
    }
    return() => {
      if(myChart)
      myChart.destroy()
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BubbleChart;
