import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    HStack,
    VStack,
    Text
} from '@chakra-ui/react'
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent'
import { FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout'
import LineChart from '../components/widgets/charts/LineChart'
import DonutPieChart from '../components/widgets/charts/DonutPieChart'
import { PiChartDonutFill } from 'react-icons/pi'
import UseAssetSummary from '../Services/Hooks/UseAssetSummary'
import ColumnChart from '../components/widgets/charts/ColumnChart'
import { FaChartColumn } from 'react-icons/fa6'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import PlantViewRuntime from '../assets/PlantView/PlantViewRuntime'
import GeneratorPowerDG from '../assets/GeneratorPowerDG'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import UseGeneratorTable from '../Services/Hooks/UseGeneratorTable'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus'
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily'
import UseManyDeviceSameKeyChart from '../Services/Hooks/UseManyDeviceSameKeyChart'
import UsePlanViewTable from '../Services/Hooks/PlantView/UsePlantViewTable'
import { html } from 'gridjs'


interface APIData {
    column : string[];
    dataFromAPI : string[][]; 
  }


const InverterDashboard = () => {


    // ************************* GENERATOR POWER *********************

    var search = {
        devName : "Summation", // sum
        keys : "INV_Total_Power" //GeneratroPower
    }
    const GeneratorPower = UseBatteryStatus(search) || [0];




    
    // ********************* Inverter Daily Energy *********************
    const {
        timeWindow: timeWindowInverterDailyEnergy,
        handleTimeWindowChange: handleTimeWindowInverterDailyEnergyChange,
        handleReset: InverterDailyEnergyHandleReset
    } = useTimeHandle(1, "cdsf", "NONE", [5, "minute"]);
    
    
    var searchTagInverterDailyEnergy = { 
        devName : "Summation",                  //"Inverter-1", // cal
        keys : "INV_DailyEnergy_Total",         //"B1_Inverter_Inverter_1_Energy_Daily_kWh",
        type : ["spline"],
        name : ["Inverter Daily Energy"]
    };
    const InverterDailyEnergyData : any = UseBESSDaily(searchTagInverterDailyEnergy, timeWindowInverterDailyEnergy);
    // Use useState to manage the title state
    const [InverterDETitle, setInverterDETitle] = useState<number>(0);
    useEffect(() => {
        if (InverterDailyEnergyData) {
            var len = InverterDailyEnergyData[0].data.length;
            var tempData = InverterDailyEnergyData[0].data;
            setInverterDETitle(tempData[len-1][1]);
            console.log("InverterDETitle : ", InverterDETitle);
            console.log("InverterDailyEnergyData:", InverterDailyEnergyData);
        }
    }, [InverterDailyEnergyData]);
    
    // ************************* Load Power ******************
    
    const searchObj = {
        inverter: "B1_Inverter_Inverter_0_AC_Active_Power_Watt"
    };
    
    const pieData = UseAssetSummary(searchObj) || [];
    
    // ********************* Inverter Power *********************
    const {
        timeWindow: timeWindowInverterPower,
        handleTimeWindowChange: handleTimeWindowInverterPowerChange,
        handleReset: InverterPowerHandleReset
    } = useTimeHandle(1, "cdsf", "NONE", [5, "minute"]);
    
    
    var searchTagInverterPower = { 
        devName : "Inverter", 
        keys : "B1_Inverter_Inverter_0_AC_Active_Power_Watt",
        type : "spline",
        name : "INV-"
    };
    const InverterPowerData = UseManyDeviceSameKeyChart(searchTagInverterPower, timeWindowInverterPower);
    useEffect(() => {
        if (InverterPowerData) {
            console.log("InverterPowerData:", InverterPowerData);
        }
    }, [InverterPowerData]);
    
    // ********************* Daily Energy kWh *********************
    const {
        timeWindow: timeWindowDailyEnergykWh,
        handleTimeWindowChange: handleTimeWindowDailyEnergykWhChange,
        handleReset: DailyEnergykWhHandleReset
    } = useTimeHandle(1, "hour", "AVG", [1, "hour"]);
    
    
    var searchTagDailyEnergykWh = { 
        devName : "Inverter", 
        keys : "B1_Inverter_Inverter_0_Energy_Daily_kWh",
        type : "column",
        name : "INV - "
    };
    const DailyEnergykWhData = UseManyDeviceSameKeyChart(searchTagDailyEnergykWh, timeWindowDailyEnergykWh);
    useEffect(() => {
        if (DailyEnergykWhData) {
            console.log("DailyEnergykWhData:", DailyEnergykWhData);
        }
    }, [DailyEnergykWhData]);
    
    // ********************* Inverter Control *********************
    const {
        timeWindow: timeWindowInverterControl,
        handleTimeWindowChange: handleTimeWindowInverterControlChange,
        handleReset: InverterControlHandleReset
    } = useTimeHandle(1, "cdsf", "NONE", [5, "minute"]);
    
    
    var searchTagInverterControl = { 
        devName : "Inverter", // cal
        keys : "B1_Inverter_Inverter_0_Active_Power_referance",
        type : "spline",
        name : "INV - "
    };
    const InverterControlData = UseManyDeviceSameKeyChart(searchTagInverterControl, timeWindowInverterControl);
    useEffect(() => {
        if (InverterControlData) {
            console.log("InverterControlData:", InverterControlData);
        }
    }, [InverterControlData]);
    
    // ******************** Inverter Table ***********************
    
    var searchInverterTable = {
        Inverter : "B1_Inverter_Inverter_0_Inverter_Communication,B1_Inverter_Inverter_0_AC_Active_Power_Watt,B1_Inverter_Inverter_0_AC_Reactive_Power_var,B1_Inverter_Inverter_0_AC_Apparent_Power_VA,B1_Inverter_Inverter_0_Active_Power_referance,B1_Inverter_Inverter_0_Energy_Daily_kWh,B1_Inverter_Inverter_0_Energy_Total_kWh,B1_Inverter_Inverter_0_Frequency_Hz,B1_Inverter_Inverter_0_Volt_L1_L2,B1_Inverter_Inverter_0_Volt_L2_L3,B1_Inverter_Inverter_0_Volt_L3_L1,B1_Inverter_Inverter_0_Fault_Code"
    }
    var InverterColumn = ["Name", {
        name : "State",
        formatter: (cell: any) => parseFloat(cell) > 0 ? html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:green; height:15px; width:15px; border-radius:50%;"></div></div>`) : html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:red; height:15px; width:15px; border-radius:50%;"></div></div>`)
        }, "Power kW", "Power kVAR", "Power KVA", "kW % Ref", "Daily Energy", "Total Energy", "Frequency Hz", "L1-L2 Volts", "L2-L3 Volts", "L3-L1 Volts", "Fault State"]

    const InverterTableData = UsePlanViewTable(searchInverterTable) as any;
    console.log("InverterTableData", InverterTableData);
    
return (
    <Box maxW="full" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
            <Breadcrumb spacing="8px" separator={<FaCaretRight color="gray.500" />} mb={5}>
                <BreadcrumbItem color="rgba(0, 79, 134, 1)" fontSize={12}>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontSize={12} as={Link} to="/portfolio">
                        Portfolio
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12}>
                        Sites
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12} as={Link} to="/inverter">
                        Inverter
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Grid
                h="68px"
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={1}
            >
                <GridItem w={"580px"} h={59}>
                    <Fieldset_kW52860 />
                </GridItem>

                <GridItem w={"auto"} h={58}>
                    <Fieldset_Mode />
                </GridItem>
                <GridItem w={"auto"} h={59}>
                    <Fieldset_Power />
                </GridItem>
                <GridItem w={"auto"} h={58}>
                    <Fieldset_State />
                </GridItem>
                <GridItem w={"auto"} h={58}>
                    <Fieldset_Temp />
                </GridItem>
                <GridItem w={"279px"}>
                    <Fieldset_Devices />
                </GridItem>
            </Grid>

            <Grid
                mt={5}
                h={265}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={1}
            >
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <GeneratorPowerDG
                        value={(GeneratorPower[0]) || 0}
                    />
                </GridItem>
                {/********* Inverter Daily Energy ***********/}
                <GridItem h={276} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Inverter Daily Energy'
                        width={["full", "auto"]}
                        height='276'
                        // timeWindow={true}
                        onTimeWindowChange={handleTimeWindowInverterDailyEnergyChange}
                        onReset={InverterDailyEnergyHandleReset}
                    >
                        <LineChart
                        height={188}
                          props={
                                {title : 
                                    {text : (InverterDETitle).toFixed(2)+"kWh"
                                        ,style : {color : "#21A01E"}
                                    },
                                    xAxis : 
                                    {visible : false},
                                    legend : {enabled : false}, 
                                    exporting : {enabled : false}
                                }
                            }
                          apiData={InverterDailyEnergyData || [{}]}
                        />
                    </ChartLayout>
                </GridItem>
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='% Load Power'
                        width={["full", "auto"]}
                        height='277px'
                        icon={PiChartDonutFill}
                    >
                        <DonutPieChart
                            apiData={pieData}
                        />
                    </ChartLayout>
                </GridItem>
            </Grid>

            <Grid
                mt={5}
                h={300}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(2, 1fr)"}
                gap={1}
            >
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Inverter Power'
                        width={["full", "auto"]}
                        height='303'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowInverterPowerChange}
                        onReset={InverterPowerHandleReset}
                    >
                        <LineChart height={240} apiData={InverterPowerData || [{}]}
                            props={{
                                yAxis : {
                                    title : {
                                        text : "kW",
                                        style : {
                                            letterSpacing : "1px",
                                            fontWeight : "500",
                                            color : "#606060",
                                        }
                                    }
                                },
                            }}
                        />
                    </ChartLayout>
                </GridItem>
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Daily Energy kWh'
                        width={["full", "auto"]}
                        height='303px'
                        icon={FaChartColumn}
                        timeWindow ={true}
                        onTimeWindowChange={handleTimeWindowDailyEnergykWhChange}
                        onReset={DailyEnergykWhHandleReset}
                    >
                        <ColumnChart height={240} apiData={DailyEnergykWhData || [{}]}
                            props={{
                                yAxis : {
                                    title : {
                                        text : "kWh",
                                        style : {
                                            letterSpacing : "1px",
                                            fontWeight : "500",
                                            color : "#606060",
                                        }
                                    }
                                },
                            }}
                        />
                    </ChartLayout>
                </GridItem>
            </Grid>

            <Grid
                mt={5}
                h={300}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(2, 1fr)"}
                gap={1}
            >
                <GridItem h={303} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Inverter Availability'
                        width={["full", "auto"]}
                        height='303px'
                        icon={FaChartColumn}
                        timeWindow ={true}
                        onTimeWindowChange={handleTimeWindowDailyEnergykWhChange}
                        onReset={DailyEnergykWhHandleReset}
                    >
                        <ColumnChart height={240} apiData={DailyEnergykWhData || [{}]} />
                    </ChartLayout>
                </GridItem>
                <GridItem h={303} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Inverter Control'
                        width={["full", "auto"]}
                        height='303'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowInverterControlChange}
                        onReset={InverterControlHandleReset}
                    >
                        <LineChart height={240} apiData={InverterControlData || [{}]}
                            props={{
                                yAxis : {
                                    title : {
                                        text : "% kW Ref",
                                        style : {
                                            letterSpacing : "1px",
                                            fontWeight : "500",
                                            color : "#606060",
                                        }
                                    }
                                },
                            }}
                        />
                    </ChartLayout>
                </GridItem>
            </Grid>

            <Grid
                mt={5}
                h={300}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(1, 1fr)"}
                gap={1}
                mb={3}
            >
                <GridItem h={305} w={"auto"} colSpan={1} rowSpan={1}>
                    <PlantViewTableLayout
                        title='Inerters'
                        width={["full", "auto"]}
                        height='305px'
                    >
                        <PlantTable 
                            paginationLimitProps={8}
                            column={InverterColumn}
                            apiData={InverterTableData || []}
                        />
                    </PlantViewTableLayout>
                </GridItem>
            </Grid>
    </Box>
  )
}

export default InverterDashboard;