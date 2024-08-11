import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options = {
    chart: {
        type: 'bar',
        height : 50,
        width : 100,
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ['SoC', 'DoD', 'SoH'],
        lineColor: 'transparent', // Make the axis line invisible
        tickLength: 0, // Hide the axis ticks as well
        labels : {
            padding : "1px",
            style : {
                fontSize : '8px',
                fontWeight : 600,
                color : '#657079'
            }
        }
    },
    yAxis: {
        visible: false,
        min: 0,
        max: 100
    },
    tooltip : false,
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: false,
                inside: false,
            },
            pointWidth : 4,
            colorByPoint : true,
            colors: ['#3C5FC5', '#B3261E', '#FFC63B'],
        }
    },
    series: [{
        data: [85, 40, 60],
    }],
    exporting : {
        enabled : false
    },
    credits : {
        enabled : false
    },
    legend : {
        enabled : false
    }
};

const SparkBarChart: React.FC = () => <HighchartsReact highcharts={Highcharts} options={options} />;

export default SparkBarChart;