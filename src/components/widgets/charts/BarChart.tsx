import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
    const options = {
        chart: {
            type: 'bar',
            backgroundColor : "transparent",
            height : "240px"
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            labels : {
                enabled : false,
                style: {
                    fontSize: '10px',
                    fontFamily: 'inter',
                }
            }
        },
        yAxis: {
            labels: {
                enabled : true,
                autoRotation: [45, 90],
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            enabled: true,
            align : "left"
        },
        tooltip: {
            pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            colors: [
                '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                '#03c69b',  '#00f194'
            ],
            colorByPoint: true,
            groupPadding: 0,
            data: [
                ['Tokyo', 37.33],
                // ['Delhi', 31.18],
                // ['Shanghai', 27.79],
                // ['Sao Paulo', 22.23],
                // ['Mexico City', 21.91],
                // ['Dhaka', 21.74],
                // ['Cairo', 21.32],
                // ['Beijing', 20.89],
                // ['Mumbai', 20.67],
                // ['Osaka', 19.11],
                // ['Karachi', 16.45],
                // ['Chongqing', 16.38],
                // ['Istanbul', 15.41],
                // ['Buenos Aires', 15.25],
                // ['Kolkata', 14.974],
                // ['Kinshasa', 14.970],
                // ['Lagos', 14.86],
                // ['Manila', 14.16],
                // ['Tianjin', 13.79],
                // ['Guangzhou', 13.64]
            ],
            dataLabels: {
                enabled: false,
                rotation: 90,
                color: '#FFFFFF',
                inside: true,
                verticalAlign: 'top',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }],
        plotOptions : {
            bar : {
                pointWidth : 25
            }
        },
        credits : {
            enabled : false
        }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default BarChart;