import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SparkLineChartProps {
    data : Number;
    color : string;
}

const SparklineChart : React.FC<SparkLineChartProps> = ({data ,color}) => {
    const options = {
        chart: {
            type: 'line',
            height: "30", // Adjust the height as needed
            width : 90,
            backgroundColor : "transparent",
            margin: [0, 0, 0, 5], // Adjust the margins to make it compact
        },
        title: {
            text: null
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        legend: {
            enabled: false
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {point.y}',
            valueDecimals: 2,
            enabled : false
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false // Disable data point markers
                }
            },
            series: {
                type : "spline",
                lineWidth : 3,
                marker: {
                    enabled: false // Disable data point markers
                },
                spline: {
                    marker: {
                        enable: false
                    }
                }
            }
        },
        series: [{
            data: data, // Add your data points here
            color: color // Customize the color as needed
        }],
        credits : {
            enabled : false
        }
    }
    return (
        <HighchartsReact highcharts={Highcharts} options={options} />
    );
}

export default SparklineChart;