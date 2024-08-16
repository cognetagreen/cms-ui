import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarLineChart: React.FC = () => {
    const options = {
        chart: {
            type: 'bar', // Set the default type to bar
            height : 260,
        },
        title: {
            text: 'Bar and Spline Combination Chart Example'
        },
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Bar Data',
            type: 'bar',
            data: [5, 3, 4, 7, 2] // Example data for the bar series
        }, {
            name: 'Spline Data',
            type: 'spline',
            data: [2, 2, 3, 5, 1] // Example data for the spline series
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default BarLineChart;