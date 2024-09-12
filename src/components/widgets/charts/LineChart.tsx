import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface LineChartProps {
    apiData?: Object[];
    height?: number;
    bg?: string;
    props?: any;
}

const LineChart: React.FC<LineChartProps> = ({ apiData, height = null, bg, props }) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            backgroundColor: bg || 'transparent',
            height: height,
            zoomType: 'x',
        },
        title: {
            text: '',
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: '',
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: ' unit',
        },
        series: apiData || [],
        credits: {
            enabled: false,
        },
        // responsive: {
        //     rules: [
        //         // {
        //         //     condition: {
        //         //         maxHeight: 400,
        //         //     },
        //         //     chartOptions: {
        //         //         chart: {
        //         //             height: 240,
        //         //         },
        //         //     },
        //         // },
        //         // {
        //         //     condition: {
        //         //         maxHeight: 800,
        //         //     },
        //         //     chartOptions: {
        //         //         chart: {
        //         //             height: 540,
        //         //         },
        //         //     },
        //         // },
        //     ],
        // },
    });

    useEffect(() => {
        if (apiData) {
            setChartOptions((prevOptions) => ({
                ...prevOptions,
                series: apiData,
                ...(props || {}),
            }));
        }
    }, [apiData, props]);
    
    useEffect(() => {
        const handleResize = () => {
            // Highcharts.charts.forEach((chart: Highcharts.Chart | undefined) => {
                if (Highcharts.charts) {
                    console.log("zakir")
                    chartOptions.chart.height = 800
                }
            // });
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default LineChart;