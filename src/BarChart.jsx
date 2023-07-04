import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'
const ChartComponent = ({datas}) => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const containerRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  Chart.register(ChartDataLabels);
  useEffect(() => {
    //Chart -1 ----------------------------------------------------
    //(item.partner.split(' ')[0].charAt(0)+item.partner.split(' ')[1])
    const data = {
      labels: datas.map((item, index) => item.partner),
      datasets: [
        {
          label: 'Completion Percentage',
          data: datas.map((item) => ({
            x: item.DaysSinceOnboarding,
            y: item.NumberOfCorridors,
            r: item.NumberOfCorridors > 25? item.NumberOfCorridors : 25 ,
            partner: item.partner,
            hoverRadius: 12,
          })),
          backgroundColor:
          datas.map((item) => ( item.NumberOfCorridors > 50 ? '#74D4AC' : item.NumberOfCorridors > 25 ? '#F0DF73' : '#FF9D99')),
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: 'bar',
      data,
      options: {
        maintainAspectRatio : false,
        layout:{
          padding:{
            top: 10,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks:{
              display:false,
            },
            grid:{
              drawTicks:false,
              drawBorder: false
            }
          },
          x:{
            grid:{
              display:false,
            },
            
          }
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
                return `${context.label}`
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
            anchor: 'start',
            align: 'end',
            formatter: (ctx) => (ctx.partner[0]+ctx.partner.split(' ')[1]),
            font: {
                weight: 'bold',
                size: 14
            },
            color: "black",
        }
        }
      },
    };
    const myChart = new Chart(chartRef.current, config);
     //Chart -2 ----------------------------------------------------
     const data2 = {
      labels: myChart.data.labels,
      datasets: [
        {
          label: 'Completion Percentage',
          data: myChart.data.datasets[0].data,
        }]
    };

    const config2 = {
      type: 'bar',
      data: data2,
      options: {
        maintainAspectRatio : false,
        layout:{
          padding:{
            bottom:28.5
          }
        },
        scales: {
          x:{
            ticks:{
              display:false
            },
            grid:{
              drawTicks:false
            },
          },
          y: {
            beginAtZero: true,
            afterFit: (ctx) => {
              ctx.width = 35;
            },
            ticks: {
              stepSize: 25
          }
          },
        },
        plugins:{
          legend:{
            display:false,
          },
          
          datalabels: {
            display:false,
        }
        }
      },
    };
    const myChar2 = new Chart(chartRef2.current, config2);
    const box = document.querySelector('.boxCont')
    const barLength = myChart.data.labels.length
    if(barLength > 6) {
      const chartWidth = 700 + ((barLength-6) * 30)
      box.style.width = `${chartWidth}px`
    }
    return () => {
      myChart.destroy();
      myChar2.destroy();
    };
  }, []);
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
  }, []);
  const handleScrollLeft = useCallback(() => {
    if (containerRef.current) {
      const newScrollLeft = Math.max(0, scrollLeft - 100);
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setScrollLeft(newScrollLeft);
    }
  }, [scrollLeft]);
  const handleScrollRight = useCallback(() => {
    if (containerRef.current) {
      const newScrollLeft = Math.min(
        containerRef.current.scrollWidth - containerRef.current.clientWidth,
        scrollLeft + 100
      );
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setScrollLeft(newScrollLeft);
    }
  }, [scrollLeft]);
  const handleWheel = useCallback(
    (event) => {
      const newScrollLeft = event.deltaY > 0
        ? Math.min(
          containerRef.current.scrollWidth - containerRef.current.clientWidth,
          scrollLeft + 100
        )
        : Math.max(0, scrollLeft - 100);
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
      setScrollLeft(newScrollLeft);
    },
    [scrollLeft]
  );
  return (
    <>
      <div className="chartCard w-full flex flex-col items-center justify-center">
        <div className="chartBox relative flex w-[700px] p-5 px-8">
          <div className="absolute -left-6 h-[90%] flex justify-center items-center" >
        <button className='bg-white border border-gray-300 rounded-md h-[32px] w-[32px] shadow-md hover:bg-gray-100 transition-all duration-150 text-xl font-medium flex items-center justify-center' onClick={handleScrollLeft}>{'<'}</button>
          <div className="text-sm flex w-fit absolute left-0 rotate-[270deg] whitespace-nowrap">Completion %</div>
          </div>
          <div className="absolute right-0 h-[90%] flex justify-center items-center" style={{background:'linear-gradient(90deg, rgba(255,255,255,0.1169642857142857) 18%, rgba(255,255,255,0.927608543417367) 100%)'}}>
        <button className='bg-white border border-gray-300 rounded-md h-[32px] w-[32px] shadow-md hover:bg-gray-100 transition-all duration-150 text-xl font-medium flex items-center justify-center' onClick={handleScrollRight}>{'>'}</button>
        </div>
          <div className="colSmall w-[35px]">
          <canvas ref={chartRef2} />
          </div>
          <div ref={containerRef} onWheel={handleWheel} className="colLarge max-w-[700px] overflow-x-hidden">
          <div className="boxCont h-[500px]" style={{width:'calc(700px - 35px)'}}>
          <canvas ref={chartRef} />
          </div>
          </div>
        </div>
          <div className="text-sm">Partners</div>
      </div>
    </>
  );
};

export default ChartComponent;
