import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface AreaSplineChartProps {
    apiData? : Object[];
    height? : number | string;
    props? : any;
}

const AreaSplineChart : React.FC <AreaSplineChartProps> = ({apiData, height="300px", props}) => {
    const [chartOption, setChartOptions] = useState({
        chart: {
            type: 'areaspline',
            height : height,
            backgroundColor : 'transparent'
        },
        title: {
            text: ''
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
        },
        credits : {
            enabled : false
        }
    });

    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            series : apiData || [{}],
            ...props
        }))
    }, [apiData, props])

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOption} />
    );
};

export default AreaSplineChart;