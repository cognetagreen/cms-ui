import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StackedColumnChart: React.FC = () => {
    useEffect(() => {
        const options: Highcharts.Options = {
            chart: {
                backgroundColor : "transparent",
                height : "260px"
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Bananas', 'Grapes']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'bottom',
                x: 0,
                y: 100
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                type : "column",
                name: 'John',
                data: [5, 3, 4, 7]
            }, {
                type : "column",
                name: 'Jane',
                data: [2, 2, 3, 2]
            }, {
                type : "column",
                name: 'Joe',
                data: [3, 4, 4, 2]
            }],
            credits : {
                enabled : false
            }
        };

        Highcharts.chart('container', options);
    }, []);

    return <div id="container"></div>;
};

export default StackedColumnChart;