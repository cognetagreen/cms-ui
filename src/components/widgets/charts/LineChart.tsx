import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
    apiData? : Object[];
    height? : Number
}

const LineChart : React.FC<LineChartProps> = ({apiData, height=210}) => {
    if(!apiData) {

        apiData = [{
            name: 'Line 1',
            data: [1, 2, 3, 4, 5]
        }, {
            name: 'Line 2',
            data: [5, 4, 3, 2, 1]
        }, {
            name: 'Line 3',
            data: [3, 1, 2, 5, 4]
        }]
    }
    console.log("apiData : ", apiData )
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