import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AreaSplineChart = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'areaspline',
            height : '300px',
            backgroundColor : 'transparent'
        },
        title: {
            text: 'Monthly Sales Data'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
        series: [{
            type : "areaspline",
            name: 'Sales 2021',
            data: [100, 150, 200, 180, 250, 300, 280, 320, 350, 400, 380, 420]
        }, {
            type : "areaspline",
            name: 'Sales 2020',
            data: [80, 120, 160, 150, 200, 250, 240, 280, 300, 350, 330, 370]
        }],
        legend : {
            align : "left"
        }
    };

    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
};

export default AreaSplineChart;