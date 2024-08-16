import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const CandlestickChart: React.FC = () => {
    const options = {
        chart : {
            height : 270
        },
        title: {
            text: ''
        },
        tooltip: {
            shared: true,
            valueDecimals: 2,
            useHTML: true,
            pointFormat: '<b>{point.series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}',
            backgroundColor: '#ffffff',
            borderColor: '#cccccc',
        },
        series: [{
            type: 'candlestick',
            name: 'AAPL',
            data: [
                [1625097600000, 145.0, 150.0, 144.0, 149.0],
                [1625184000000, 149.0, 152.0, 148.0, 151.0],
                [1625270400000, 151.0, 153.0, 150.0, 152.0],
                // Add more data points here
            ],
            color: '#FF0000', // Down candle color
            upColor: '#3C5FC5', // Up candle color
            lineWidth: 1, // Wick line width
            borderWidth: 2, // Border width for the candles
            dataGrouping: {
                enabled: true // Enable data grouping for better performance
            },
            pointWidth : 10,
            style: {
                color: '#333333',
            },
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    );
};

export default CandlestickChart;