// PieChart.jsx
import Chart from "react-apexcharts";

function PieChart(props) {
  
  const state = {
    type: "pie",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
    tooltip: {
      enabled: false,
      x: {
        show: false,
      },
    },
    options: {
      chart: {
        
        toolbar: {
          show: false,
        },
        tooltip: {
          enabled: false,
          x: {
            show: false,
          },
        }
        
      },
      dropShadow: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 1,
          opacityTo: 0.76,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      }
    },
    series: [52.8, 26.8, 20.4],
    colors: ["#1C64F2", "#16BDCA", "#9061F9"]
    
  };
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 py-4">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{props.keyData || "96$"}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">{props.title || "Money Saved A Day"}</p>
        </div>
      </div>
      <div id="area-chart">
        <Chart
          options={state.options}
          series={state.series}
          fontFamily={state.fontFamily}
          toolbar={state.toolbar}
          tooltip={state.tooltip}
          type={state.type}
          colors={state.colors}
          width="100%"/>
      </div>
    </div>
  );
  
}

export default PieChart;
