import React, { memo, useEffect, useState } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface DonutPieChartProps {
  apiData : Object[];
  pieColors : string[];
}

const DonutPieChart: React.FC<DonutPieChartProps> = ({apiData, pieColors}) => {

  const options = {
    chart: {
      type: 'pie',
      height: '240px',
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
      align: 'left',
    },
    subtitle: {
      text: '',
      align: 'left',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b><br>{point.percentage}%',
          distance: 5,
        },
        innerSize: '50%',
        showInLegend: true,
      },
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'horizontal',
      symbolRadius: 4,
      symbolHeight: 8,
      itemStyle: {
        fontWeight: 500,
        fontSize: 12,
        color: '#657079',
      },
    },
    colors : pieColors || [
                  '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                  '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                  '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                  '#03c69b', '#00f194'
              ],
    series: [
      {
        enableMouseTracking: true,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        data: apiData,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default memo(DonutPieChart);
