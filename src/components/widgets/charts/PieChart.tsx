import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  const data = [
    { name: 'Connected', y: 9, color: '#03BB7D' },  // Added color
    { name: 'Disabled', y: 1, color: '#FF0000' },    // Added color
  ];

  const options = {
    chart: {
      type: 'pie',
      height : 220,
      width : 220,
      zIndex : 999999,
    },
    title: {
      text: null,  // Temporarily remove the title
    },
    subtitle: {
        text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10<br>STRINGS',
        align: 'center',
        verticalAlign: 'middle',
        style: {
            fontSize: '12px',
            fontWeight: 600,
            color : "#000"
        },
        useHTML: true,
        y: 10
    },
    plotOptions: {
      pie: {
        innerSize: '50%',  // Comment out to see if it affects rendering
        dataLabels : {
            enabled : false
        }
      },
    },
    series: [
        {
        name : "Strings",
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
    exporting : {
        enabled : false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
