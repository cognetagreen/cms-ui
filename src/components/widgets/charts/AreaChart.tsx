import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AreaChart = () => {
    const options = {
        chart: {
            type: 'area',
            backgroundColor : "transparent",
            height : "290px"
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        },
        yAxis: {
            title: {
                text: 'Values'
            }
        },
        series: [{
            name: 'Data1',
            data: [10, 20, 15, 25, 30]
        }, {
            name : "data2",
            data: [30, 40, 60, 25, 30]
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default AreaChart;