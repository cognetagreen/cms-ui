import React, { useEffect, useState } from 'react';
import Highcharts, { Series } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
    apiData? : Object[];
    height? : Number
    props? : any;
}

const LineChart : React.FC<LineChartProps> = ({apiData, height=210, props}) => {

    const [chartOptions, setChartOptions] = useState({
        chart: {
            backgroundColor : "transparent",
            height : height,
            zoomType : "x"
        },
        title: {
            text: "",
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
                    const value = this.value as number; // Type assertion for value
                    const date = new Date(value);
                    // Adjusting for timezone offset
                    const utcOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
                    const localDate = new Date(date.getTime() - utcOffset);
                    return localDate.toISOString().slice(10, 16).replace('T', ' '); // Format as 'YYYY-MM-DD HH:mm:ss'
                }
            }
        },
        yAxis : {
            title : {
                text : ""
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' unit',
            formatter: function (this: Highcharts.TooltipFormatterContextObject | any): string {
                const date = new Date(this.x);
                const utcOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
                const localDate = new Date(date.getTime() - utcOffset);
                return `<b>${localDate.toISOString().slice(0, 19).replace('T', ' ')}</b><br/>${this.series.name}: ${this.y}`;
            }
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
                series: apiData,
                ...props
            });
        }
    }, [apiData, props]);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    );
};

export default LineChart;