import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface StakedColumnProps {
    apiData? : Object[];
    height? : Number;
}

const StackedColumnChart: React.FC<StakedColumnProps> = ({apiData, height=210}) => {

        const [chartOptions, setChartOptions] = useState({
            chart: {
                type : "column",
                backgroundColor : "transparent",
                height : height
            },
            title: {
                text: ''
            },
            xAxis: {
                type : 'datetime'
            },
            yAxis : {
                stackLabels : {
                    enabled : true
                }
            },
            legend: {
                align: 'left',
                verticalAlign: 'bottom',
                x: 0,
                y: 100
            },
            tooltip: {
                shared : true,
                pointFormat: '{series.name}: {point.y}<br/>'//Total: {point.stackTotal}
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [] as Object[],
            credits : {
                enabled : false
            }
        })

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

export default StackedColumnChart;