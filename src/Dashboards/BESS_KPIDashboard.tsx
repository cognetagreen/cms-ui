import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent'
import { FaCaretRight, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout'
import LineChart from '../components/widgets/charts/LineChart'
import BatteryDigitalProgressBar from '../assets/BESS/KPI/BatteryDigitalProgressBar'
import BarLineChart from '../components/widgets/charts/BarLineChart'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily'
import { useEffect } from 'react'

const BESS_KPIDashboard = () => {
    

    // ******************BESS Cumulative *******************
    const {
        timeWindow: timeWindowCumulative,
        handleTimeWindowChange: handleTimeWindowCumulativeChange,
        handleReset: CumulativeHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);

    var searchTagCumulative = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["spline"],
        name : ["MIN", "MAX"]
    };
    const CumulativeData = UseBESSDaily(searchTagCumulative, timeWindowCumulative);
    useEffect(() => {
        if (CumulativeData) {
            console.log("CumulativeData:", CumulativeData);
        }
    }, [CumulativeData]);

    // ************************ DailDischargey********************
    const {
        timeWindow: timeWindowDailyDischarge,
        handleTimeWindowChange: handleTimeWindowDailyDischargeChange,
        handleReset: DailyDischargeHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagDailyDischarge = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["bar", "spline"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const DailyDischargeData = UseBESSDaily(searchTagDailyDischarge, timeWindowDailyDischarge);
    useEffect(() => {
        if (DailyDischargeData) {
            console.log("DailyDischargeData:", DailyDischargeData);
        }
    }, [DailyDischargeData]);

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
            templateRows={"repeat(2, 1fr)"}
            templateColumns={"repeat(4, 1fr)"}
            gap={1}
            mt={10}
        >
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Daily Depth of Discharge'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Daily DC Discharge Energy'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Reliability'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Availability'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Average SOC'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Resting SOC'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Average C-Rate'
                    value='61%'
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Temperature within Warranty Range'
                    value='61%'
                />
            </GridItem>
            
        </Grid>
        <Grid
            templateRows={"repeat(1, 1fr)"}
            templateColumns={"repeat(2, 1fr)"}
            gap={2}
            mt={0}
        >
            <GridItem colSpan={1} rowSpan={1}>
                <ChartLayout
                    title='Cumulative Discharge Energy'
                    width={["full", "auto"]}
                    height='290px'
                >
                    <LineChart height={260} apiData={CumulativeData || [{}]} />
                </ChartLayout>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1}>
                <ChartLayout
                    title='Daily Discharge Energy'
                    width={["full", "auto"]}
                    height='290px'
                    timeWindow={true}
                    onTimeWindowChange={handleTimeWindowDailyDischargeChange}
                    onReset={DailyDischargeHandleReset}
                >
                    <BarLineChart height={250} apiData={DailyDischargeData || [{}]}/>
                </ChartLayout>
            </GridItem>
        </Grid>
    </Box>
  )
}

export default BESS_KPIDashboard;