import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface columnLineType {
    apiData? : Object[]
}

const ColumnLineChart : React.FC <columnLineType> = ({apiData}) => {

    const [chartOptions, setChartOptions] = useState({
        chart : {
            backgroundColor : "transparent",
            height : "220px"
        },
        title: {
            text: ''
        },
        xAxis: {
            type: "datetime",
            label : {
                enabled : false,
            }
        },
        yAxis: [{
            title: {
                text: 'Primary Axis'
            }
        }, {
            title: {
                text: 'Secondary Axis'
            },
            opposite: true
        }],
        series: [] as Object[],
        credits : {
            enabled : false
        }
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
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default ColumnLineChart;