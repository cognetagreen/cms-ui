import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    VStack
} from '@chakra-ui/react'
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent'
import { FaCaretRight, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BatteryBank, SomeTitle, StateOfBattery } from '../components/BESS/Overview'
import BatteryStatus from '../assets/BESS/Overview/BatteryStatus'
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout'
import StackedColumnChart from '../components/widgets/charts/StackedColumnChart'
import { FaChartColumn } from 'react-icons/fa6'
import LineChart from '../components/widgets/charts/LineChart'
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus'
import { useEffect, useState } from 'react'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily'
import UseSomeTitle from '../Services/Hooks/Battery/UseSomeTitle'
import UseManyDeviceManyKeysChart from '../Services/Hooks/UseManyDeviceManyKeysChart'

// *********************** Battery Status **********************

const BESS_OverviewDashboard = () => {

    var search = {
        devName : "BESS",
        keys : "BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_REACTIVE_POWER,BESS1_APPARENT_POWER,BESS1_POWER,BESS1_POWER"
    }
    const batteryStatus = UseBatteryStatus(search) || [];

    // ********************* BESS Output *********************
    const {
        timeWindow: timeWindowBESSOutput,
        handleTimeWindowChange: handleTimeWindowBESSOutputChange,
        handleReset: BESSOutputHandleReset
    } = useTimeHandle(5, "hour", "NONE", [5, "minute"]);

    
    var searchTagBESSOutput = { 
        devName : "BESS",
        keys: "BESS1_POWER,BESS1_REACTIVE_POWER,BESS1_APPARENT_POWER",
        type : ["spline","spline","spline"],
        name : ["kW", "kVar", "KVA"]
    };
    const BESSOutpuColor = "#3853A5";
    const BESSOutputData = UseBESSDaily(searchTagBESSOutput, timeWindowBESSOutput)?.map((series : object, index : number) =>({
        ...series,
        color : BESSOutpuColor
    }));
    // useEffect(() => {
    //     if (BESSOutputData) {
    //         console.log("BESSOutputData:", BESSOutputData);
    //     }
    // }, [BESSOutputData]);

    // ************************BESS Daily********************
    const {
        timeWindow: timeWindowBESSDaily,
        handleTimeWindowChange: handleTimeWindowBESSDailyChange,
        handleReset: BESSDailyHandleReset
    } = useTimeHandle(1, "day", "NONE", [5, "minute"]);
    
    var searchTagBESSDaily = [{ 
        devName : "BESS",
        keys: "BESS1_ENERGY_Total",
        type : ["column"],
        name : ["Daily Discharge kWh"]
    }];
    const BESSDailyColor = ["#B11F24", "#7F5B9F", "#3853A5", "#F4B725", "#01875A"]
    const BESSDailyData = UseManyDeviceManyKeysChart(searchTagBESSDaily, timeWindowBESSDaily, "LastValue")?.map((series : object, index : number) => ({
        ...series,
        color : BESSDailyColor[index]
    }));
    // useEffect(() => {
    //     if (BESSDailyData) {
    //         console.log("BESSDailyData:", BESSDailyData);
    //     }
    // }, [BESSDailyData]);

    // ******************BESS MIN MAX *******************
    const {
        timeWindow: timeWindowMinMax,
        handleTimeWindowChange: handleTimeWindowMinMaxChange,
        handleReset: MinMaxHandleReset
    } = useTimeHandle(7, "day", "NONE", [10, "minute"]);

    var searchTagMinMax = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["spline", "spline"],
        name : ["MIN", "MAX"]
    };
    const MinMaxColor = ["#3853A5", "#F4B725"];
    const MinMaxData = UseBESSDaily(searchTagMinMax, timeWindowMinMax)?.map((series : object, index : number) => ({
        ...series,
        color : MinMaxColor[index]
    }));
    // useEffect(() => {
    //     if (MinMaxData) {
    //         console.log("MinMaxData:", MinMaxData);
    //     }
    // }, [MinMaxData]);


    // ******************* Some Title ******************
    var searchTagSomeTitle = {
        devName : "Inverter-",
        sparkBarKeys : "B1_Inverter_Inverter_0_DC_String2_Volt,B1_Inverter_Inverter_0_DC_String3_Volt",
        keys : "B1_Inverter_Inverter_0_DC_String2_Volt,B1_Inverter_Inverter_0_DC_String3_Volt"
    }
    const [someTitleData, setSomeTitleData] =  useState([{bar : [85, 75, 65], temp : 20, volt : 7}, {bar : [35, 25, 65], temp : 20, volt : 7}])
    const fetchSomeTitleData = UseSomeTitle(searchTagSomeTitle);
    // useEffect(()=> {
    //     if(fetchSomeTitleData) {
    //         setSomeTitleData(fetchSomeTitleData);
    //     }
    // }, [fetchSomeTitleData])

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
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12} as={Link}>
                    BESS
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

            <Grid
                w={"full"}
                m={0}
                mt={3}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={1}
            >
                <GridItem w={"auto"}>
                    <VStack spacing={0}>
                            <StateOfBattery data={batteryStatus}/>
                        <GridItem mt={1} ml={-2} mr={-1}>
                            <BatteryStatus
                                ACD = {batteryStatus[0] || 0}
                                SOH = {batteryStatus[1] || 0}
                                Min = {batteryStatus[2] || 0}
                                Max = {batteryStatus[3] || 0}
                                />
                        </GridItem>
                    </VStack>
                </GridItem>
                    <GridItem w={"660px"}>
                    <VStack w={"auto"} spacing={0}>
                        <ChartLayout
                            title='Daily BESS Discharge mWh'
                            width={["full", "100%"]}
                            height='350px'
                            icon={FaChartColumn}
                            timeWindow = {true}
                            onTimeWindowChange={handleTimeWindowBESSDailyChange}
                            onReset={BESSDailyHandleReset}
                            fullScreen={true}
                        >
                            <StackedColumnChart height={260} apiData={BESSDailyData || [{}]} />
                        </ChartLayout>
                        <Box mt={-3} w={"100%"}>
                            <ChartLayout
                                title='BESS Output'
                                width={["full", "100%"]}
                                height='350px'
                                icon={FaChartColumn}
                                timeWindow = {true}
                                onTimeWindowChange={handleTimeWindowBESSOutputChange}
                                onReset={BESSOutputHandleReset}
                                >
                                <LineChart height={280} apiData = {BESSOutputData || [{}]} />
                            </ChartLayout>
                        </Box>
                        <Box mt={-3} w={"100%"}>
                            <ChartLayout
                                title='Max and Min SoC'
                                width={["full", "100%"]}
                                height='330px'
                                icon={FaChartLine}
                                timeWindow={true}
                                onTimeWindowChange={handleTimeWindowMinMaxChange}
                                onReset={MinMaxHandleReset}
                                >
                                <LineChart height={240} apiData={MinMaxData || [{}]}/>
                            </ChartLayout>
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem w={"auto"}>
                    <VStack w={"auto"} spacing={0}>
                            <SomeTitle apiData={someTitleData || [{bar : [85, 75, 65], temp : 20, volt : 7}, {bar : [35, 25, 65], temp : 20, volt : 7}]} />
                        {/* <GridItem> */}
                            <BatteryBank />
                        {/* </GridItem> */}
                    </VStack>
                </GridItem>
            </Grid>
    </Box>
  )
}

export default BESS_OverviewDashboard