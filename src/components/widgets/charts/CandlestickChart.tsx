import React, { useEffect, useState } from 'react';
import Highcharts, { Options, Series } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

// interface data {
//     name : string;
//     type? : string;
//     data : number[][];
// }

interface CandlestickChartProps {
    apiData? : any[];
    bg? : string;
}

const CandlestickChart: React.FC <CandlestickChartProps> = ({apiData, bg}) => {

    console.log(apiData, "candlestick")
const [chartOption, setChartOption] = useState<Object>({
        chart : {
            height : 270,
            backgroundColor : bg || "transparent"
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
        rangeSelector: {
            enabled: false // Disable the range selector
        },
        navigator: {
            enabled: false // Disable the navigator (footer part)
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
    });

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            const transformedSeries = apiData.map(series => {
                const candlestickData = series.data.map((point : any, index : any) => {
                    // Assuming the value is the closing price and using the previous and next values for open, high, and low
                    const open = index > 0 ? series.data[index - 1][1] : point[1];
                    const high = Math.max(open, point[1]);
                    const low = Math.min(open, point[1]);
                    const close = point[1];

                    return [point[0], open, high, low, close];
                });

                return {
                    name: series.name,
                    type: series.type || 'candlestick',
                    data: candlestickData,
                    marker: {
                        enabled: false
                    }
                };
            });

            setChartOption(prevOptions => ({
                ...prevOptions,
                series: transformedSeries
            }));
        }
    }, [apiData]);
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={chartOption}
            />
        </div>
    );
};

export default CandlestickChart;