import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    HStack,
    VStack,
    Text,
    SimpleGrid
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
            // console.log("InverterDETitle : ", InverterDETitle);
            // console.log("InverterDailyEnergyData:", InverterDailyEnergyData);
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
    const InverterPowerColor = ["#C700BF", "#53971D", "#F4B725", "#09BCC7", "#1325CB", "#19CA16", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
            '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
            '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
            '#03c69b', '#00f194']
    const InverterPowerData = UseManyDeviceSameKeyChart(searchTagInverterPower, timeWindowInverterPower)?.map((series : object, index : number) => ({
        ...series,
        color : InverterPowerColor[index]
    }));
    // useEffect(() => {
    //     if (InverterPowerData) {
    //         console.log("InverterPowerData:", InverterPowerData);
    //     }
    // }, [InverterPowerData]);
    
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
    const DailyEnergykWhColor = ["#C92323", "#19CA16", "#0086CC", "#A38415", "#940386", "#8842E0", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
        '#03c69b', '#00f194']
    const DailyEnergykWhData = UseManyDeviceSameKeyChart(searchTagDailyEnergykWh, timeWindowDailyEnergykWh)?.map((series : object, index : number) => ({
        ...series,
        color : DailyEnergykWhColor[index]
    }));
    // useEffect(() => {
    //     if (DailyEnergykWhData) {
    //         console.log("DailyEnergykWhData:", DailyEnergykWhData);
    //     }
    // }, [DailyEnergykWhData]);
    
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
    const InverterControlColor = ["#C92323", "#19CA16", "#0086CC", "#A38415", "#940386", "#8842E0", '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
        '#03c69b', '#00f194']
    const InverterControlData = UseManyDeviceSameKeyChart(searchTagInverterControl, timeWindowInverterControl)?.map((series : object, index : number) => ({
        ...series,
        color : InverterControlColor[index]
    }));
    // useEffect(() => {
    //     if (InverterControlData) {
    //         console.log("InverterControlData:", InverterControlData);
    //     }
    // }, [InverterControlData]);
    
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

            {/* ****************** TOP RIBBON ************ */}
                <GridItem colSpan={1} rowSpan={1}
                
                    display={{base : "none", sm : "none", md : "block"}}
                >    
                    <Grid
                        // h={["300px","200px","200px","130px","60px","60px"]}
                        templateRows={["repeat(6, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)"]}
                        templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(6, 1fr)","repeat(6, 1fr)"]}
                        gap={[1]}
                    >
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, 12]} h={59}>
                            <Fieldset_kW52860 />
                        </GridItem>

                        <GridItem w={"auto"} fontSize={[7, 7, 5, 7, 12, 12]} h={58}>
                            <Fieldset_Mode />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 5, 10, 12, 12]} h={59}>
                            <Fieldset_Power />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, 12]} h={58}>
                            <Fieldset_State />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, 12]} h={58}>
                            <Fieldset_Temp />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, 12]}>
                            <Fieldset_Devices />
                        </GridItem>
                    </Grid>
                </GridItem>
            {/* <Grid 
                templateRows={{base : "repeat(4, 1fr)",md : "repeat(4, auto)",xl : "285px 310px 310px 315px"}}
                templateColumns={{base : "repeat(1, 1fr)",md : "repeat(1, 1fr)",xl : "repeat(1, auto)"}}
                gap={0}
            > */}

                <GridItem maxW={["8xl"]} rowSpan={1} colSpan={1}>
                    <SimpleGrid
                        // mt={5}
                        // h={290}
                        // templateRows={{base : "repeat(3, 1fr)",md : "repeat(3, 1fr)",xl : "repeat(1, 1fr)"}}
                        // templateColumns={{base : "repeat(1, 1fr)",md : "repeat(1, 1fr)",xl : "repeat(3, 1fr)"}}
                        minChildWidth={['260px' ,'400px']} h={"max-content"} spacing={{ base: 3, lg: 3 }}
                        gap={1}
                    >
                        <GridItem h={"285px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                width={["100%", "470px", "470px", "100%"]}
                                height={["100%" ,'100%']}
                                px='0'
                                mt='-8'
                            >
                                <GeneratorPowerDG
                                    value={(GeneratorPower[0]) || 0}
                                />
                            </ChartLayout>
                        </GridItem>
                        {/* ******** Inverter Daily Energy ********** */}
                        <GridItem h={"285px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='Inverter Daily Energy'
                                width={["full", "100%"]}
                                height='100%'
                                // timeWindow={true}
                                onTimeWindowChange={handleTimeWindowInverterDailyEnergyChange}
                                onReset={InverterDailyEnergyHandleReset}
                            >
                                <LineChart
                                props={
                                        {title : 
                                            {text : (InverterDETitle).toFixed(2)+"kWh"
                                                ,style : {color : "#21A01E"}
                                            },
                                            xAxis : 
                                            {visible : false},
                                            legend : {enabled : false}, 
                                            exporting : {enabled : false},
                                            chart : {
                                                height : null
                                            }
                                        }
                                    }
                                apiData={InverterDailyEnergyData || [{}]}
                                />
                            </ChartLayout>
                        </GridItem>
                        <GridItem h={"285px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='% Load Power'
                                width={["full", "100%"]}
                                height='100%'
                                icon={PiChartDonutFill}
                            >
                                <DonutPieChart
                                    apiData={pieData}
                                    pieColors={["#704199", "#0086CC", "#66D1C9", "#F8931F",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                        '#03c69b', '#00f194']}
                                />
                            </ChartLayout>
                        </GridItem>
                    </SimpleGrid>
                </GridItem>
                
                <GridItem maxW={"8xl"} rowSpan={1} colSpan={1}>
                    <SimpleGrid
                        mt={2}
                        minChildWidth={["260px","500px"]}
                        gap={[1]}
                    >
                        <GridItem h={"300px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='Inverter Power'
                                width= {["full", "auto"]} //{["100%", "100%", "500px", "450px", "710px", "100%"]}
                                height='300px'
                                timeWindow={true}
                                onTimeWindowChange={handleTimeWindowInverterPowerChange}
                                onReset={InverterPowerHandleReset}
                                fullScreen={true}
                            >
                                <LineChart apiData={InverterPowerData || [{}]}
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
                                        chart : {
                                            width : null,
                                            height : 230,                                        
                                        },
                                        
                                    }}
                                />
                            </ChartLayout>
                        </GridItem>
                        <GridItem h={"300px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='Daily Energy kWh'
                                width= {["full", "auto"]} //{["100%", "100%", "500px", "450px", "710px", "100%"]}
                                height='100%'
                                icon={FaChartColumn}
                                timeWindow ={true}
                                onTimeWindowChange={handleTimeWindowDailyEnergykWhChange}
                                onReset={DailyEnergykWhHandleReset}
                                fullScreen={true}
                            >
                                <ColumnChart apiData={DailyEnergykWhData || [{}]}
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
                                        chart : {
                                            width : null,
                                            height : null,
                                        }
                                    }}
                                />
                            </ChartLayout>
                        </GridItem>
                    </SimpleGrid>
                </GridItem>

                <GridItem maxW={"8xl"} rowSpan={1} colSpan={1}>
                    <SimpleGrid
                        mt={2}
                        minChildWidth={["260px","500px"]}
                        // h={300}
                        // templateRows={"repeat(1, 1fr)"}
                        // templateColumns={"repeat(2, 1fr)"}
                        gap={1}
                    >
                        <GridItem h={"300px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='Inverter Availability'
                                width={["full", "100%"]}
                                height='100%'
                                icon={FaChartColumn}
                                timeWindow ={true}
                                onTimeWindowChange={handleTimeWindowDailyEnergykWhChange}
                                onReset={DailyEnergykWhHandleReset}
                            >
                                <ColumnChart apiData={DailyEnergykWhData || [{}]} />
                            </ChartLayout>
                        </GridItem>
                        <GridItem h={"300px"} colSpan={1} rowSpan={1}>
                            <ChartLayout
                                title='Inverter Control'
                                width={["full", "100%"]}
                                height='100%'
                                timeWindow={true}
                                onTimeWindowChange={handleTimeWindowInverterControlChange}
                                onReset={InverterControlHandleReset}
                            >
                                <LineChart apiData={InverterControlData || [{}]}
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
                    </SimpleGrid>
                </GridItem>
                
                <GridItem maxW={"8xl"} rowSpan={1} colSpan={1}>    
                    <Grid
                        mt={2}
                        // h={300}
                        templateRows={"repeat(1, 1fr)"}
                        templateColumns={"repeat(1, 1fr)"}
                        gap={1}
                        mb={3}
                    >
                        <GridItem h={305} colSpan={1} rowSpan={1} overflow={"auto"}>
                            <PlantViewTableLayout
                                title='Inerters'
                                width={["full", "100%"]}
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
                </GridItem>
            {/* </Grid> */}
    </Box>
  )
}

export default InverterDashboard;