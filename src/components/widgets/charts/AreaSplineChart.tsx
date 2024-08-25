import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface AreaSplineChartProps {
    apiData? : Object[];
}

const AreaSplineChart : React.FC <AreaSplineChartProps> = ({apiData}) => {
    const [chartOption, setChartOptions] = useState({
        chart: {
            type: 'areaspline',
            height : '300px',
            backgroundColor : 'transparent'
        },
        title: {
            text: 'Monthly Sales Data'
        },
        xAxis: {
            type : "datetime"
        },
        yAxis: {
            title: {
                text: 'Sales'
            }
        },
        series: [] as Object[],
        legend : {
            align : "left"
        }
    });

    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            series : apiData || [{}]
        }))
    }, [apiData])

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOption} />
    );
};

export default AreaSplineChart;