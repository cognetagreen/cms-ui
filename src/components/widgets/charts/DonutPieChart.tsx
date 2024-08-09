import React, { memo, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface DonutPieChartProps {
  apiData : Object[];
}

const DonutPieChart: React.FC<DonutPieChartProps> = ({apiData}) => {

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
