import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import HighchartsFullScreen from 'highcharts/modules/full-screen';
import HighchartsReact from 'highcharts-react-official';

Highcharts3D(Highcharts); // Initialize the 3D module
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsFullScreen(Highcharts);

interface ColumnChartProps {
  apiData? : Object[];
  height? : Number;
  category? : string[];
  props? : any;
}

const ColumnChart : React.FC <ColumnChartProps> = ({apiData, height=270, category, props}) => {
// console.log(category)
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'column',
      backgroundColor: "transparent",
      height: height,
      // options3d: {
      //   enabled : true,
      //   alpha: 20, // Adjust this to control the tilt
      //   beta: 0,  // Adjust this to control the rotation
      //   depth: 0, // Adjust this to control the depth of the bars
      //   // viewDistance: 25
      // },

    },
    title: {
      text: null
    },
    series: [] as Object[],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        },
        pointWidth : 10,
        borderWidth : 1,
        borderRadius : 50
      }
    },
    legend: {
      enabled: true,
      align: 'left',
      verticalAlign: 'bottom'
    },
    tooltip : {
      enabled : true
    },
    xAxis : {
      labels : {
        enabled : true
      },
      type : 'datetime',
      gridLineWidth: 0,
    },
    yAxis : {
      title : {
        text: null
      },
      plotLines: [{
        color: '#000000',
        width: 2,
        value: -0,
        zIndex: 5 
      }],
      gridLineWidth: 2
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ['viewFullscreen', 'printChart', 'downloadPNG', 'downloadPDF', 'downloadXLS']
        }
      }
    },
    credits: {
      enabled: false
    }
  });

  
  useEffect(() => {
    if (apiData) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: apiData,
        ...props
      }));

      if (category) {
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xAxis : {
          ...prevOptions.xAxis,
            categories: category
          }
        }));
      }
    }
  }, [apiData, category, props]);

    return (
    <>
    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>

  );
}
export default ColumnChart;