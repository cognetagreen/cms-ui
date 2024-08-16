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
    type: 'column',
    backgroundColor: "transparent",
    height: "270px",
    options3d: {
      enabled : true,
      alpha: 20, // Adjust this to control the tilt
      beta: 0,  // Adjust this to control the rotation
      depth: 0, // Adjust this to control the depth of the bars
      // viewDistance: 25
    },

  },
  title: {
    text: null
  },
  series: [{
    data: [
      { y: 122.5, color: '#0086CC'}, // Front color
      { y: 44.5, color: '#03BB7D' },
      { y: 41.5, color: '#03B' },
      { y: 441.5, color: '#03BA' },
      { y: 444.5, color: '#04AF7D' },
      { y: 434.5, color: '#000' },
      { y: 414.5, color: '#888' },
    ]
  }],
  plotOptions: {
    column: {
      dataLabels: {
        enabled: false
      },
      pointWidth : 40,
      borderWidth : 20,
      borderRadius : 50
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
};

const ColumnChart = () => (
  <>
  <HighchartsReact highcharts={Highcharts} options={options} />
  </>

);

export default ColumnChart;