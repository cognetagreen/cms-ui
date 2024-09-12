import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface BarLineChartProps {
    apiData? : Object[];
    height? : Number;
    bg? : string;
}

const BarLineChart: React.FC <BarLineChartProps> = ({apiData, height, bg}) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar', // Set the default type to bar
            height : height,
            backgroundColor : bg || "transparent"
        },
        title: {
            text: ''
        },
        xAxis: {
            type : 'datetime'
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [] as Object[]
    });

    useEffect(() => {
        if (apiData) {
            setChartOptions({
                ...chartOptions,
                series: apiData
            });
        }
    }, [apiData]);

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
        </div>
    );
};

export default BarLineChart;