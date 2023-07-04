import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto';
const LineChart = ({data, successData, failureData }) => {
  const chartRef = useRef(null);
  Date.prototype.reduceDates = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
let startDate = new Date("January 19, 2023 07:12:04")
  let endDate = startDate.reduceDates(3)
  // let startDate = endDate.reduceDates(1)
  
 
  console.log(endDate)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: getDatesInRange(startDate, endDate,1),
          datasets: [
            {
              label: 'Success',
              data: data.map(entry => ({x:entry.recordDate,y:entry.success})),
              borderColor: 'green',
              fill: false
            },
            {
              label: 'Failure',
              data: data.map(entry =>({x:entry.recordDate,y:entry.failure})),
              borderColor: 'red',
              fill: false
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                stepSize: 2,
                displayFormats: {
                  day: 'MMM D h:mm A'
              }
              }
            },
            y: {
              ticks:{
                stepSize: 50
              }
            }
          },    
          plugins:{
            legend:{
              display:false,
            }, 
        }}
      });
      return () => {
        chart.destroy();
      };
    }
  }, [successData, failureData, startDate, endDate]);

  const getDatesInRange = (start, end, interval=1) => {
    const dates = [];
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + interval);
    }
    return dates;
  };
  
  console.log(getDatesInRange(startDate, endDate,1))
  return <canvas ref={chartRef} />;
};

export default LineChart;
