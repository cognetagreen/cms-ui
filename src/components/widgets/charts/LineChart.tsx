import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = () => {
    const options = {
        chart: {
            type: 'line',
            backgroundColor : "transparent",
            height : "210px"
        },
        title: {
            text: ''
        },
        series: [{
            name: 'Line 1',
            data: [1, 2, 3, 4, 5]
        }, {
            name: 'Line 2',
            data: [5, 4, 3, 2, 1]
        }, {
            name: 'Line 3',
            data: [3, 1, 2, 5, 4]
        }],
        credits : {
            enabled : false
        }
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default LineChart;