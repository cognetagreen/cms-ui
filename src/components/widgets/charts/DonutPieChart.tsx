import React, { useEffect } from 'react';
import Highcharts, { animate } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutPieChart: React.FC = () => {
  
  // useEffect(() => {
  //   (function (H) {
  //     const pieSeries = H.Series.types.pie.prototype;

  //     pieSeries.animate = function (this: any, init: boolean) {
  //       const series = this,
  //             chart = series.chart,
  //             points = series.points,
  //             { animation } = series.options,
  //             { startAngleRad } = series;

  //       function fanAnimate(point: any, startAngleRad: number) {
  //         const graphic = point.graphic,
  //               args = point.shapeArgs;

  //         if (graphic && args) {
  //           graphic
  //             .attr({
  //               start: startAngleRad,
  //               end: startAngleRad,
  //               opacity: 1
  //             })
  //             .animate({
  //               start: args.start,
  //               end: args.end
  //             }, {
  //               duration: animation.duration / points.length
  //             }, function () {
  //               if (points[point.index + 1]) {
  //                 fanAnimate(points[point.index + 1], args.end);
  //               }
  //               if (point.index === series.points.length - 1) {
  //                 series.dataLabelsGroup.animate({
  //                   opacity: 1
  //                 },
  //                 void 0,
  //                 function () {
  //                   points.forEach((point: any) => {
  //                     point.opacity = 1;
  //                   });
  //                   series.update({
  //                     enableMouseTracking: true
  //                   }, false);
  //                   chart.update({
  //                     plotOptions: {
  //                       pie: {
  //                         innerSize: '40%',
  //                         borderRadius: 8
  //                       }
  //                     }
  //                   });
  //                 });
  //               }
  //             });
  //         }
  //       }

  //       if (init) {
  //         points.forEach((point: any) => {
  //           point.opacity = 0;
  //         });
  //       } else {
  //         fanAnimate(points[0], startAngleRad);
  //       }
  //     };
  //   }(Highcharts));
  // }, []);

  const options = {
    chart: {
      type: 'pie',
      height : "240px",
      backgroundColor : "transparent"
    },
    title: {
      text: '',
      align: 'left'
    },
    subtitle: {
      text: '',
      align: 'left'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
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
        showInLegend : true
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'horizontal',
      symbolRadius: 4,
      symbolHeight: 8,
      itemStyle: {
        fontWeight: 500,
        fontSize : 12,
        color: '#657079'
      },
    },
    series: [{
      enableMouseTracking: true,
      animation: {
        duration: 2000
      },
      colorByPoint: true,
      data: [{
        name: 'Customer Support',
        y: 21.3
      }, {
        name: 'Development',
        y: 18.7
      }, {
        name: 'Sales',
        y: 20.2
      }, {
        name: 'Marketing',
        y: 14.2
      }, {
        name: 'Other',
        y: 25.6
      }]
    }],
    credits : {
        enabled : false
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default DonutPieChart;
