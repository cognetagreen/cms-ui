import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
    apiData? : Object[];
    height? : Number
}

const LineChart : React.FC<LineChartProps> = ({apiData, height=210}) => {

    const [chartOptions, setChartOptions] = useState({
        chart: {
            backgroundColor : "transparent",
            height : height,
            zoomType : "x"
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        tooltip : {
            // enabled : true,
            shared : true,
            valueSuffix : ' unit',
        },
        series: apiData,
        credits : {
            enabled : false,
        },
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
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
};

export default LineChart;