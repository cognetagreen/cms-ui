import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnLineChart = () => {
    const options = {
        chart : {
            backgroundColor : "transparent",
            height : "220px"
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: [{
            title: {
                text: 'Primary Axis'
            }
        }, {
            title: {
                text: 'Secondary Axis'
            },
            opposite: true
        }],
        series: [{
            name: 'Line Series',
            type: 'line',
            data: [5, 10, 15, 20, 25],
            yAxis: 1
        }, {
            name: 'Column Series',
            type: 'column',
            data: [10, 20, 30, 40, 50]
        }],
        credits : {
            enabled : false
        }
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default ColumnLineChart;