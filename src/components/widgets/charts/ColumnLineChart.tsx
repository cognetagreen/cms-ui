import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import UseColumnLine from '../../../Services/Hooks/UseColumnLine';

const ColumnLineChart = () => {
    const textSearch = "inverter-1";
    const type = {
        column : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance",
        line : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt,B1_Inverter_Inverter_1_DC_String2_Watt,B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_AC_Apparent_Power_VA,B1_Inverter_Inverter_1_AC_Reactive_Power_var",
    };

    const apiData = UseColumnLine(textSearch, type) || [{
        name: 'Line Series',
        type: 'spline',
        data: [5, 10, 15, 20, 25],
        yAxis: 1
    }, {
        name: 'Column Series',
        type: 'column',
        data: [10, 20, 30, 40, 50]
    }];

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