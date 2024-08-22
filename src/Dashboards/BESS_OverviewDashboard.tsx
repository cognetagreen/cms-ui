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

// *********************** Battery Status **********************

const BESS_OverviewDashboard = () => {

    var search = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt,B1_Inverter_Inverter_1_DC_String2_Watt"
    }
    const batteryStatus = UseBatteryStatus(search) || [];

    // ********************* BESS Output *********************
    const {
        timeWindow: timeWindowBESSOutput,
        handleTimeWindowChange: handleTimeWindowBESSOutputChange,
        handleReset: BESSOutputHandleReset
    } = useTimeHandle(5, "hour", "NONE", [5, "minute"]);

    
    var searchTagBESSOutput = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt",
        type : ["spline"],
        name : ["Energy Total"]
    };
    const BESSOutputData = UseBESSDaily(searchTagBESSOutput, timeWindowBESSOutput);
    useEffect(() => {
        if (BESSOutputData) {
            console.log("BESSOutputData:", BESSOutputData);
        }
    }, [BESSOutputData]);

    // ************************BESS Daily********************
    const {
        timeWindow: timeWindowBESSDaily,
        handleTimeWindowChange: handleTimeWindowBESSDailyChange,
        handleReset: BESSDailyHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagBESSDaily = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["column"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const BESSDailyData = UseBESSDaily(searchTagBESSDaily, timeWindowBESSDaily);
    useEffect(() => {
        if (BESSDailyData) {
            console.log("BESSDailyData:", BESSDailyData);
        }
    }, [BESSDailyData]);

    // ******************BESS MIN MAX *******************
    const {
        timeWindow: timeWindowMinMax,
        handleTimeWindowChange: handleTimeWindowMinMaxChange,
        handleReset: MinMaxHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);

    var searchTagMinMax = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["spline"],
        name : ["MIN", "MAX"]
    };
    const MinMaxData = UseBESSDaily(searchTagMinMax, timeWindowMinMax);
    useEffect(() => {
        if (MinMaxData) {
            console.log("MinMaxData:", MinMaxData);
        }
    }, [MinMaxData]);


    // ******************* Some Title ******************
    var searchTagSomeTitle = {
        devName : "Inverter-",
        sparkBarKeys : "B1_Inverter_Inverter_0_DC_String2_Volt,B1_Inverter_Inverter_0_DC_String3_Volt",
        keys : "B1_Inverter_Inverter_0_DC_String2_Volt,B1_Inverter_Inverter_0_DC_String3_Volt"
    }
    const [someTitleData, setSomeTitleData] =  useState([{bar : [85, 75, 65], temp : 20, volt : 7}, {bar : [35, 25, 65], temp : 20, volt : 7}])
    const fetchSomeTitleData = UseSomeTitle(searchTagSomeTitle);
    useEffect(()=> {
        if(fetchSomeTitleData) {
            setSomeTitleData(fetchSomeTitleData);
        }
    }, [fetchSomeTitleData])

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
                mt={3}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={1}
            >
                <VStack spacing={0}>
                    <GridItem>
                        <StateOfBattery data={batteryStatus}/>
                    </GridItem>
                    <GridItem mt={1} ml={-1}>
                        <BatteryStatus
                            ACD = {batteryStatus[0] || 0}
                            SOH = {batteryStatus[1] || 0}
                            Min = {batteryStatus[2] || 0}
                            Max = {batteryStatus[3] || 0}
                        />
                    </GridItem>
                </VStack>
                <VStack w={"auto"} spacing={0}>
                    <GridItem>
                        <ChartLayout
                            title='Daily BESS Discharge mWh'
                            width={["full", "650px"]}
                            height='330px'
                            icon={FaChartColumn}
                            timeWindow = {true}
                            onTimeWindowChange={handleTimeWindowBESSDailyChange}
                            onReset={BESSDailyHandleReset}
                        >
                            <StackedColumnChart height={260} apiData={BESSDailyData || [{}]} />
                        </ChartLayout>
                    </GridItem>
                    <GridItem mt={-3}>
                        <ChartLayout
                            title='BESS Output'
                            width={["full", "650px"]}
                            height='330px'
                            icon={FaChartColumn}
                            timeWindow = {true}
                            onTimeWindowChange={handleTimeWindowBESSOutputChange}
                            onReset={BESSOutputHandleReset}
                        >
                            <LineChart height={280} apiData = {BESSOutputData || [{}]} />
                        </ChartLayout>
                    </GridItem>
                    <GridItem mt={-3}>
                        <ChartLayout
                            title='Max and Min SoC'
                            width={["full", "650px"]}
                            height='280px'
                            icon={FaChartLine}
                            timeWindow={true}
                            onTimeWindowChange={handleTimeWindowMinMaxChange}
                            onReset={MinMaxHandleReset}
                        >
                            <LineChart height={240} apiData={MinMaxData || [{}]}/>
                        </ChartLayout>
                    </GridItem>
                </VStack>
                <VStack w={"auto"} spacing={0}>
                    <GridItem>
                        <SomeTitle apiData={someTitleData || [{bar : [85, 75, 65], temp : 20, volt : 7}, {bar : [35, 25, 65], temp : 20, volt : 7}]} />
                    </GridItem>
                    <GridItem>
                        <BatteryBank />
                    </GridItem>
                </VStack>
            </Grid>
    </Box>
  )
}

export default BESS_OverviewDashboard