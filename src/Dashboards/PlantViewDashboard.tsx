import React, { useEffect } from 'react';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    HStack,
    SimpleGrid,
    VStack,
  } from '@chakra-ui/react';
  import { FaCaretRight } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout';
import PowerFlowSVG from '../assets/PlantView/PowerFlow';
import { PiFlowArrowBold } from "react-icons/pi";
import PlantViewCalculationCardLayout from '../components/Layouts/PlantViewCalculationCardLayout';
import AreaSplineChart from '../components/widgets/charts/AreaSplineChart';
import ColumnChart from '../components/widgets/charts/ColumnChart';
import { FaChartArea, FaChartColumn } from 'react-icons/fa6';
import PlantTable from '../components/widgets/tables/PlantTable';
import GridBG from '../assets/PlantView/PlantViewGridBG.svg';
import DGBG from '../assets/PlantView/PlantViewDGBG.svg';
import SolarBG from '../assets/PlantView/PlantViewSolarBG.svg';

import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout';
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent';
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus';
import { useTimeHandle } from '../Services/TimeWindowSetting';
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily';
import UsePlantCard from '../Services/Hooks/PlantView/UsePlantCard';
import UsePlanViewTable from '../Services/Hooks/PlantView/UsePlantViewTable';
import { html } from 'gridjs';
import UseManyDeviceManyKeysChart from '../Services/Hooks/UseManyDeviceManyKeysChart';
import { objectEach } from 'highcharts';
  const PlantViewDashboard = () => {

    // *********************************Power FLow****************
    var search = {
        devName : "Calculation",
        keys : "INV_Total_Power_cal,Generator_Power,load_power"
    }
    const batteryStatus = UseBatteryStatus(search) || [];


    // ********************* Daily Energy Graph *********************
    const {
        timeWindow: timeWindowPowerColumn,
        handleTimeWindowChange: handleTimeWindowPowerColumnChange,
        handleReset: PowerColumnHandleReset
    } = useTimeHandle(7, "day", "NONE", [5, "minute"]);

    
    var searchTagPowerColumn = [
        {
            devName : "Calculation",
            keys : "Generator_Daily_energy_sum,Node_Generation_Loss_BP", //Node_Generation_Loss_BP : PG API doen't work
            type : ["column","column"],
            name : ["DG Daily Energy","PV Generation Loss kWh"]   
        },
        {
            devName : "Summation",
            keys : "INV_DailyEnergy_Total",
            type : ["column"],
            name : ["PV Daily Energy"]
        },
        {
            devName : "Grid",
            keys : "AGC_EXPORT_DAY",
            type : ["column",],
            name : ["Grid Consumption kWh"]      
        }
    ];
    const PowerColumnColor = ["#10BDF3", "#19CA16", "#8842E0", "#CF4E4E"];
    const PowerColumnData = UseManyDeviceManyKeysChart(searchTagPowerColumn, timeWindowPowerColumn, "LastValue")?.map((series : object, index : number) => ({
        ...series,
        color : PowerColumnColor[index]
    }));
    // useEffect(() => {
    //     if (PowerColumnData) {
    //         console.log("PowerColumnData:", PowerColumnData);
    //     }
    // }, [PowerColumnData]);

    // ********************* Power Curve *********************
    const {
        timeWindow: timeWindowPowerCurve,
        handleTimeWindowChange: handleTimeWindowPowerCurveChange,
        handleReset: PowerCurveHandleReset
    } = useTimeHandle(12, "hour", "NONE", [5, "minute"]);

    
    var searchTagPowerCurve = { 
        devName : "Calculation",
        keys : "INV_Total_Power_cal,Generator_Power,AGC4_POWER_cal,load_power",
        type : ["areaspline","areaspline","areaspline","areaspline"],
        name : ["PV kW","DG kW","Grid kW","Load kW"]
    };

    const PowerCurveColor = ["#4E6DCA", "#189269", "#8842E0", "#CF4E4E"];
    const PowerCurveData = UseBESSDaily(searchTagPowerCurve, timeWindowPowerCurve)?.map((series : object, index : number) => ({
        ...series,
        color : PowerCurveColor[index]
    }));
    // useEffect(() => {
    //     if (PowerCurveData) {
    //         console.log("PowerCurveData:", PowerCurveData);
    //     }
    // }, [PowerCurveData]);

    //******************************Solar Card*************** */
    // Columns => Always "Key"
    // Values => Telemetry Name
    // Status => 0 : AVG / 1 : SUM
    var searchSolarCard = '[{"columns" : "Key","values" : "INV_Total_Power_cal","status" : 0},{"columns" : "Key","values" : "INV_DailyEnergy_Total","status" : 1},{"columns" : "Key","values" : "INV_Tilldate_Energy_MWh","status" : 1},{"columns" : "Key","values" : "CUF","status" : 0},{"columns" : "Key","values" : "CO2_Saving","status" : 0}]'
    var DataLabel = ["PV Power kW", "PV Generation kWh", "PV Lifetime Generation MWh", "CUF %", "CO2 Saving Tons"]
    const PlantCardData = UsePlantCard(searchSolarCard, DataLabel) || [[]];
    // console.log(PlantCardData)


    // ******************** Inverter Table ***********************
    
    var searchInverterTable = {
        Inverter : "B1_Inverter_Inverter_0_Inverter_Communication,B1_Inverter_Inverter_0_AC_Active_Power_Watt,B1_Inverter_Inverter_0_AC_Reactive_Power_var,B1_Inverter_Inverter_0_AC_Apparent_Power_VA,B1_Inverter_Inverter_0_Active_Power_referance,B1_Inverter_Inverter_0_Energy_Daily_kWh,B1_Inverter_Inverter_0_Energy_Total_kWh,B1_Inverter_Inverter_0_Frequency_Hz,B1_Inverter_Inverter_0_Volt_L1_L2,B1_Inverter_Inverter_0_Volt_L2_L3,B1_Inverter_Inverter_0_Volt_L3_L1,B1_Inverter_Inverter_0_Fault_Code"
    }
    var InverterColumn = ["Name", {
        name : "State",
        width : "200px",
        formatter: (cell: any) => parseFloat(cell) > 0 ? html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:green; height:15px; width:15px; border-radius:50%;"></div></div>`) : html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:red; height:15px; width:15px; border-radius:50%;"></div></div>`)
        }, "Power kW", "Power kVAR", "Power KVA", "kW % Ref", "Daily Energy", "Total Energy", "Frequency Hz", "L1-L2 Volts", "L2-L3 Volts", "L3-L1 Volts", "Fault State"]

    const InverterTableData = UsePlanViewTable(searchInverterTable) as any;
    // console.log("InverterTableData", InverterTableData);

    // ******************** PV Meter Table ***********************
    
    var searchPVMeterTable = {
        PV : "ASC4_POWER,ASC4_AMP_L1,ASC4_AMP_L2,ASC4_AMP_L3,ASC4_APPARENT_POWER,ASC4_HZ_L1,ASC4_PF,ASC4_REACTIVE_POWER,ASC4_VOLT_L1_L2,ASC4_VOLT_L2_L3,ASC4_VOLT_L3_L1,ASC4_ENERGY_Total"
    }
    var PVMeterColumn = ["Name", "Power kW", "L1 Amps", "L2 Amps", "L3 Amps", "Power KVA", "Frequency Hz", {
        name : "PF      9",
        widht : "200px",
    }, "Power kVAR", "L1 Volts", "L2 Volts", "L3 Volts","Total Energy"]

    const PVMeterTableData = UsePlanViewTable(searchPVMeterTable) as any;
    // console.log("PVMeterTableData", PVMeterTableData);

    // ******************** Generator Table ***********************
    
    var searchGeneratorTable = {
        DG : "B1_DG_DG_0_Energy_Daily_kwh,B1_DG_DG_0_Energy_Total_kwh,B1_DG_DG_0_AC_Reactive_Power_var,B1_DG_DG_0_AMP_L1,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L2,B1_DG_DG_0_AMP_L3,B1_DG_DG_0_Frequency_Hz_L1,B1_DG_DG_0_VOLT_L1_L2,B1_DG_DG_0_VOLT_L2_L3,B1_DG_DG_0_VOLT_L3_L1,B1_DG_DG_0_Fuel_Rate,B1_DG_DG_0_Engine_Speed_RPM"
    }
    var GeneratorColumn = ["Name","Power kW","Daily Export kWh","Power kVAR","L1 Amps","L2 Amps","L3 Amps","Frequency Hz","L1-L2 Volts","L2-L3 Volts","L3-L1 Volts","Fuel Rate","Engine Speed"]
    const GeneratorTableData = UsePlanViewTable(searchGeneratorTable) as any;
    // console.log("GeneratorTableData", GeneratorTableData);


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
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12} as={Link} to="/grid">
                    Plant View
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

            <Box mt={10} mb={3} display={["none", "none", "block"]}>
                <ChartLayout
                    width={["full", "100%"]}
                    height='265px'
                    title='Plant'
                    px='0'
                    icon={PiFlowArrowBold}
                >
                    <PowerFlowSVG
                        SolarValue={batteryStatus[0] || 0}
                        DGValue={batteryStatus[1] || 0}
                        GridValue={batteryStatus[2] || 0}
                        LoadValue={batteryStatus[0]+batteryStatus[1]+batteryStatus[2] || 0}
                    />
                </ChartLayout>
            </Box>
            <Box w={["280px","full"]} overflowX={"auto"}>
                <Grid
                    h={"auto"}
                    w={"max-content"}
                    templateRows="(1, 1fr)"
                    templateColumns="repeat(4, 1fr)"
                    gap={1}
                    mb={0}
                >
                    <GridItem h={300}>
                        <PlantViewCalculationCardLayout
                            width={["full", "auto"]}
                            title='Solar'
                            height='full'
                            bg={`url(${SolarBG}) no-repeat center/cover`}
                            data={PlantCardData || [[]]}
                            DataLabel={DataLabel}
                        />
                    </GridItem>
                    <GridItem h={300}>
                        <PlantViewCalculationCardLayout
                            width={["full", "auto"]}
                            height='full'
                            title='DG'
                            bg={`url(${DGBG}) no-repeat center/cover`}
                            data={PlantCardData || [[]]}
                            DataLabel={DataLabel}
                        />
                    </GridItem>
                    <GridItem h={300}>
                        <PlantViewCalculationCardLayout
                            width={["full", "auto"]}
                            height='full'
                            title='Grid'
                            bg={`url(${GridBG}) no-repeat center/cover`}
                            data={PlantCardData || [[]]}
                            DataLabel={DataLabel}
                        />
                    </GridItem>
                    <GridItem h={300}>
                        <PlantViewCalculationCardLayout
                            width={["full", "auto"]}
                            height='full'
                            title='Grid'
                            bg={`url(${GridBG}) no-repeat center/cover`}
                            data={PlantCardData || [[]]}
                            DataLabel={DataLabel}
                        />
                    </GridItem>
                </Grid>
            </Box>
            <SimpleGrid
                h={"auto"}
                maxW={"8xl"}
                minChildWidth={["280px","500px"]}
                // templateRows="repeat(1, 1fr)"
                // templateColumns="repeat(2, 1fr)"
                gap={1}
                mt={[0, 0, -3]}
                // mb={0}
            >
                <GridItem w={"100%"}>
                    <ChartLayout
                        title='Power Curve'
                        width={["full", "100%"]}
                        height='317px'
                        icon={FaChartArea}
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowPowerCurveChange}
                        onReset={PowerCurveHandleReset}
                    >
                        <AreaSplineChart height={270} props={{yAxis : {title : {text : "AC Power"}}}} apiData={PowerCurveData || [{}]} />
                    </ChartLayout>
                </GridItem>
                <GridItem w={"100%"}>
                    <ChartLayout
                        title='Daily Energy'
                        width={["full", "100%"]}
                        height='317px'
                        icon={FaChartColumn}
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowPowerColumnChange}
                        onReset={PowerColumnHandleReset}
                    >
                        <ColumnChart props={{yAxis : {title : {text : "kWh"}}}} apiData={PowerColumnData || [{}]} />
                    </ChartLayout>
                </GridItem>
            </SimpleGrid>
            <SimpleGrid
                h={"auto"}
                maxW={"8xl"}
                minChildWidth={["280px","500px"]}
                mt={[0, 0, -3]}
            >
                    <Box width={["100%","710px"]} h={"100%"}>
                        <PlantViewTableLayout
                            title='Inverter'
                            width={["full", "710px"]}
                            height='400px'
                        >
                            <PlantTable
                                paginationLimitProps={8}
                                column={InverterColumn}
                                apiData={InverterTableData || []}
                            />
                        </PlantViewTableLayout>
                    </Box>
                    <VStack w={["100%","710px"]} h={"100%"}>
                        <Box w={"100%"} overflow={'auto'}>
                            <PlantViewTableLayout
                                title='PV Meter'
                                width={["full", "100%"]}
                                height='150px'
                            >
                                <PlantTable
                                    paginationLimitProps={5}
                                    column={PVMeterColumn}
                                    apiData={PVMeterTableData || []}
                                />
                            </PlantViewTableLayout>
                        </Box>
                        <Box w={"100%"} mt={[0, 0, -6]}>    
                            <PlantViewTableLayout
                                title='Generator'
                                width={["full", "100%"]}
                                height='244px'
                            >
                                <PlantTable
                                    paginationLimitProps={5}
                                    column={GeneratorColumn}
                                    apiData={GeneratorTableData || []}
                                />
                            </PlantViewTableLayout>
                        </Box>
                    </VStack>
            </SimpleGrid>
      </Box>
    );
  };
  
  export default PlantViewDashboard
  