import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UseSpecificYield from '../../../Services/Hooks/UseSpecificYield';

const BarChart = () => {
    const textSearch = "inverter-1";
    const key = "B1_Inverter_Inverter_1_AC_Active_Power_Watt";
    const apiData = UseSpecificYield(textSearch, key);

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'bar',
            backgroundColor: "transparent",
            height: "240px"
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            labels: {
                enabled: false,
                format: '{value:%Y-%m-%d}',
                style: {
                    fontSize: '10px',
                    fontFamily: 'inter',
                }
            }
        },
        yAxis: {
            labels: {
                enabled: true,
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
            align: "left",
            itemStyle: {
                fontFamily: 'Inter'
            }
        },
        tooltip: {
            tooltip: {
                formatter(this: Highcharts.TooltipFormatterContextObject) {
                    if (this.points) {
                        let tooltip = '<b>' + Highcharts.dateFormat('%A, %b %e, %Y', this.x as number) + '</b><br/>';
                        this.points.forEach((point: any) => {
                            if (point.y !== undefined) {
                                tooltip += '<span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + point.y + '</b><br/>';
                            }
                        });
                        return tooltip;
                    }
                    return '';
                }
            },  
        },
        series : [] as Object[],
        plotOptions: {
            bar: {
                pointWidth: 25
            }
        },
        credits: {
            enabled: false
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
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
        />
    );
};

export default BarChart;



// colors: [
//             '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
//             '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
//             '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
//             '#03c69b', '#00f194'
//         ],