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
import StripsPieChart from '../components/widgets/charts/StripsPieChart'


interface APIData {
    column : string[];
    dataFromAPI : string[][]; 
  }


const DGDashboard = () => {


    // ************************* GENERATOR POWER *********************

    var search = {
        devName : "cal",
        keys : "Generator_Power"
    }
    const GeneratorPower = UseBatteryStatus(search) || [0];

    // **********************Generator Table Previous (Date & Time First Row) *********************

    // const {
    //     timeWindow : timeWindowGeneratorTable,
    //     handleTimeWindowChange : handleTimeWindowGeneratorTableChange,
    //     handleReset : handleGeneratorTableReset
    // } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);

    // const searchTag = { DG: "B1_DG_DG_0_AC_Active_Power_Watt" };
    
    // const GeneratorTableData = UseGeneratorTable(searchTag, timeWindowGeneratorTable); 

    // ******************** Generator Table ***********************
    
    var searchGeneratorTable = {
        DG : "B1_DG_DG_0_Energy_Daily_kwh,B1_DG_DG_0_Energy_Total_kwh,B1_DG_DG_0_AC_Reactive_Power_var,B1_DG_DG_0_AMP_L1,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L3,B1_DG_DG_0_Frequency_Hz_L1,B1_DG_DG_0_VOLT_L1_L2,B1_DG_DG_0_VOLT_L2_L3,B1_DG_DG_0_VOLT_L3_L1,B1_DG_DG_0_Fuel_Rate,B1_DG_DG_0_Engine_Speed_RPM"
    }
    var GeneratorColumn = ["Name","Power kW","Daily Export kWh","Power kVAR","L1 Amps","L2 Amps","L3 Amps","Frequency Hz","L1-L2 Volts","L2-L3 Volts","L3-L1 Volts","Fuel Rate","Engine Speed"]
    const GeneratorTableData = UsePlanViewTable(searchGeneratorTable) as any;
    // console.log("GeneratorTableData", GeneratorTableData);


    // ********************* Generator Daily Energy *********************
    const {
        timeWindow: timeWindowGeneratorDailyEnergy,
        handleTimeWindowChange: handleTimeWindowGeneratorDailyEnergyChange,
        handleReset: GeneratorDailyEnergyHandleReset
    } = useTimeHandle(1, "cdsf", "NONE", [5, "minute"]);

    
    var searchTagGeneratorDailyEnergy = { 
        devName : "cal", // cal
        keys : "Generator_Daily_energy_sum",
        type : ["spline"],
        name : ["Generator Daily Energy"]
    };
    const GeneratorDailyEnergyData = UseBESSDaily(searchTagGeneratorDailyEnergy, timeWindowGeneratorDailyEnergy);
    // useEffect(() => {
    //     if (GeneratorDailyEnergyData) {
    //         console.log("GeneratorDailyEnergyData:", GeneratorDailyEnergyData);
    //     }
    // }, [GeneratorDailyEnergyData]);

    // ************************* Load Power ******************
    const runtimeWidget = [1,2,3,4,5,6];

    const searchObj = {
        inverter: "B1_Inverter_Inverter_0_AC_Active_Power_Watt" // Because % in name, i'm not taking real one
    };

    const pieData = UseAssetSummary(searchObj) || [];

    // ********************* DG Power *********************
    const {
        timeWindow: timeWindowDGPower,
        handleTimeWindowChange: handleTimeWindowDGPowerChange,
        handleReset: DGPowerHandleReset
    } = useTimeHandle(10, "hour", "NONE", [5, "minute"]);

    
    var searchTagDGPower = { 
        devName : "DG", // cal
        keys : "B1_DG_DG_0_AC_Active_Power_Watt",
        type : "spline",
        name : "DG-"
    };
    const DGPowerData = UseManyDeviceSameKeyChart(searchTagDGPower, timeWindowDGPower);
    // useEffect(() => {
    //     if (DGPowerData) {
    //         console.log("DGPowerData:", DGPowerData);
    //     }
    // }, [DGPowerData]);

    // ********************* DG Ampere *********************
    const {
        timeWindow: timeWindowDGAmpere,
        handleTimeWindowChange: handleTimeWindowDGAmpereChange,
        handleReset: DGAmpereHandleReset
    } = useTimeHandle(10, "hour", "NONE", [5, "minute"]);

    
    var searchTagDGAmpere = { 
        devName : "DG", // cal
        keys : "B1_DG_DG_0_AMP_L1", // This widget tag will be present in Cal
        type : "spline",
        name : "DG-Ampere-"
    };
    const DGAmpereData = UseManyDeviceSameKeyChart(searchTagDGAmpere, timeWindowDGAmpere);
    // useEffect(() => {
    //     if (DGAmpereData) {
    //         console.log("DGAmpereData:", DGAmpereData);
    //     }
    // }, [DGAmpereData]);

    // ********************* Fuel Consumption *********************
    const {
        timeWindow: timeWindowFuelConsumtion,
        handleTimeWindowChange: handleTimeWindowFuelConsumtionChange,
        handleReset: FuelConsumtionHandleReset
    } = useTimeHandle(1, "cdsf", "MIN", [1, "day"]);

    
    var searchTagFuelConsumtion = { 
        devName : "DG", 
        keys : "B1_DG_DG_0_Energy_Total_kwh",   //AGC_EXPORT_DAY Not Present In BP720-DG-1
        type : "column",
        name : " Fuel Consumtion (kWh) "
    };
    const FuelConsumtionColor = ["#A068E6", "#03BB7D", "#1284C0"] // 3 keys
    const FuelConsumtionData = UseManyDeviceSameKeyChart(searchTagFuelConsumtion, timeWindowFuelConsumtion)?.map((series : object, index : number) => ({
        ...series,
        color : FuelConsumtionColor[index]
    }));
    // useEffect(() => {
    //     if (FuelConsumtionData) {
    //         console.log("FuelConsumtionData:", FuelConsumtionData);
    //     }
    // }, [FuelConsumtionData]);


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
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12} as={Link} to="/dg">
                    DG
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            {/* ****************** TOP RIBBON ************ */}
            <Box
                display={{base : "none", sm : "none", md : "block"}}
            >
                <Grid
                    h={["300px","200px","200px","130px","60px","60px"]}
                    templateRows={["repeat(6, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)"]}
                    templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(6, 1fr)","repeat(6, 1fr)"]}
                    gap={[5,5,5,4,1,1]}
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
            </Box>

            <SimpleGrid
                mt={5}
                h={["100%", "min-content"]}
                minW={["full", "8xl"]}
                minChildWidth={["280px","400px"]}
                column={3}
                row={3}
                gap={1}
            >
                <GridItem h={"285px"} w={"100%"} colSpan={1}>
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
                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <ChartLayout
                        title='Generator Daily Energy'
                        width={["full", "100%"]}
                        height='282px'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowGeneratorDailyEnergyChange}
                        onReset={GeneratorDailyEnergyHandleReset}
                    >
                        <LineChart height={188}
                            props={{
                                xAxis : 
                                    {visible : false},
                                    legend : {enabled : false}, 
                                    exporting : {enabled : false}
                            }}
                            apiData={GeneratorDailyEnergyData || [{}]}
                        
                        />
                    </ChartLayout>
                </GridItem>
                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <ChartLayout
                        title='% Load Power'
                        width={["full", "100%"]}
                        height='282px'
                        icon={PiChartDonutFill}
                    >
                        {/* <DonutPieChart
                            apiData={pieData}
                        /> */}
                        <StripsPieChart />
                    </ChartLayout>
                </GridItem>

                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <ChartLayout
                        title='DG Power'
                        width={["full", "100%"]}
                        height='282px'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowDGPowerChange}
                        onReset={DGPowerHandleReset}
                    >
                        <LineChart height={240} apiData={DGPowerData || [{}]} />
                    </ChartLayout>
                </GridItem>
                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <ChartLayout
                        title='Generator Daily Energy'
                        width={["full", "100%"]}
                        height='282px'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowDGAmpereChange}
                        onReset={DGAmpereHandleReset}
                    >
                        <LineChart height={241} apiData={DGAmpereData || [{}]} />
                    </ChartLayout>
                </GridItem>
                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <ChartLayout
                        title='Fuel Consumption'
                        width={["full", "100%"]}
                        height='282px'
                        icon={FaChartColumn}
                        timeWindow ={true}
                        onTimeWindowChange={handleTimeWindowFuelConsumtionChange}
                        onReset={FuelConsumtionHandleReset}
                    >
                        <ColumnChart height={240} apiData={FuelConsumtionData || [{}]} />
                    </ChartLayout>
                </GridItem>

                <GridItem h={"100%"} w={"100%"} colSpan={[1, 2]}>
                    <PlantViewTableLayout
                        title='Generators'
                        width={["full", "100%"]}
                        height='271px'
                        // timeWindow={true}
                        // onTimeWindowChange = {handleTimeWindowGeneratorTableChange}
                        // onReset={handleGeneratorTableReset}
                    >
                        <PlantTable
                            paginationLimitProps={4}
                            column={GeneratorColumn}
                            apiData={GeneratorTableData || [{ column: [], dataFromAPI: [] }]}
                        />
                    </PlantViewTableLayout>
                </GridItem>
                <GridItem h={"100%"} w={"100%"} colSpan={1}>
                    <PlantViewTableLayout
                        title='DG Runtime'
                        width={["full", "477px"]}
                        height='270px'
                    >
                        <Box>
                            <HStack spacing={10} fontFamily={"inter"} fontSize={14} color={"#4A4A4A"} mb={2}>
                                <VStack spacing={0}>
                                    <Text fontWeight={600}>Total Run Time</Text>
                                    <Text fontSize={26} fontWeight={700}>4h 49m</Text>
                                </VStack>
                                <VStack spacing={0}>
                                    <Text fontWeight={600}>Total Run Instances</Text>
                                    <Text fontSize={26} fontWeight={700}>6</Text>
                                </VStack>
                            </HStack>
                            <hr style={{borderColor: "#9B9A9A", width:"100%", margin:"auto"}} />
                            <HStack 
                                spacing={4} 
                                overflowX={"auto"} 
                                w={"100%"} 
                                minWidth={"100%"}>
                                {runtimeWidget.map((value, index) => (
                                    <Box key={index} minWidth={"140px"}>
                                        <PlantViewRuntime />
                                    </Box>
                                ))}
                            </HStack>
                        </Box>
                    </PlantViewTableLayout>
                </GridItem>
            </SimpleGrid>
    </Box>
  )
}

export default DGDashboard;