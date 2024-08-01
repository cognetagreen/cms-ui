import React from 'react';
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

const options = {
  chart: {
    type: 'bar',
    backgroundColor: "transparent",
    height: "240px",
    with : "100%",
    options3d: {
      enabled : true,
      alpha: 10, // Adjust this to control the tilt
      beta: 15,  // Adjust this to control the rotation
      depth: 0, // Adjust this to control the depth of the bars
      viewDistance: 25
    },
    // margin : 1
  },
  title: {
    text: null
  },
  series: [{
    data: [
      { y: 122.5, color: '#0086CC'}, // Front color
      { y: 44.5, color: '#03BB7D' },
    ]
  }],
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: false
      },
      depth: 65, // Set the depth of the bars
      stacking: 'normal',
      options3d : {
        enabled : true,
        beta : 5
      }
    }
  },
  legend: {
    enabled: true,
    align: 'left',
    verticalAlign: 'bottom'
  },
  xAxis : {
    labels : {
      enabled : false
    },
    plotLines: [{
      color: '#D1D8DD',
      width: 2,
      value: 1.5,
      zIndex: 5,
    }],
    gridLineWidth: 0,
  },
  yAxis : {
    title : {
      text: null
    },
    plotLines: [{
      color: '#D1D8DD',
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
};

const ColumnChart = () => (
  <>
  <HighchartsReact highcharts={Highcharts} options={options} />
  </>

);

export default ColumnChart;