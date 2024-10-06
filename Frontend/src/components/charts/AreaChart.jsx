// AreaChart.jsx
import Chart from "react-apexcharts";

function AreaChart(props) {
  
  const state = {
    type: "area",
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
          opacityFrom: 0.55,
          opacityTo: 0,
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
    series: [
      {
        name: "New users",
        data: props.data || [6500, 6418, 5856, 5526, 5356, 5456],
        color: "#1A56DB",
      },
    ]
    
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
          width="100%"/>
      </div>
    </div>
  );
  
}

export default AreaChart;
