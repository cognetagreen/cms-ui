import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    VStack
} from '@chakra-ui/react'
import { FaCaretRight, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { HealthStatus } from '../components/BESS/Health'
import AreaChart from '../components/widgets/charts/AreaChart'
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout'
import ColumnChart from '../components/widgets/charts/ColumnChart'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import CandlestickChart from '../components/widgets/charts/CandlestickChart'
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily'
import { useEffect } from 'react'

const BESS_HealthDashboard = () => {

    //*****************************************CURRENT STATUS******************************* */

    var search = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt"
    }
    const batteryStatus = UseBatteryStatus(search) || [];

    // ************************Degradation********************
    const {
        timeWindow: timeWindowDegradation,
        handleTimeWindowChange: handleTimeWindowDegradationChange,
        handleReset: DegradationHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagDegradation = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["area"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const DegradationData = UseBESSDaily(searchTagDegradation, timeWindowDegradation);
    useEffect(() => {
        if (DegradationData) {
            console.log("DegradationData:", DegradationData);
        }
    }, [DegradationData]);

    // ************************Delta V Distribution********************
    const {
        timeWindow: timeWindowVDistribution,
        handleTimeWindowChange: handleTimeWindowVDistributionChange,
        handleReset: VDistributionHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagVDistribution = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["column"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const VDistributionData = UseBESSDaily(searchTagVDistribution, timeWindowVDistribution);
    useEffect(() => {
        if (VDistributionData) {
            console.log("VDistributionData:", VDistributionData);
        }
    }, [VDistributionData]);

    // ************************Cell V Delta********************
    const {
        timeWindow: timeWindowCellV,
        handleTimeWindowChange: handleTimeWindowCellVChange,
        handleReset: CellVHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagCellV = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["column"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const CellVData = UseBESSDaily(searchTagCellV, timeWindowCellV);
    useEffect(() => {
        if (CellVData) {
            console.log("CellVData:", CellVData);
        }
    }, [CellVData]);

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
            templateRows={"repeat(1, 1fr)"}
            templateColumns={"repeat(2, 1fr)"}
            gap={1}
        >
            <GridItem>
                <HealthStatus 
                    chart={true}
                    title = "Current Status"
                    h1='Cycle'
                    v1={batteryStatus[0]}
                    h2='Usable Energy'
                    v2={`${batteryStatus[1]}MWh`}
                    h3='SOH'
                    v3={`${batteryStatus[2]}%`}
                />
            </GridItem>
            <GridItem>
                <HealthStatus 
                    chart={false}
                    title = "Statistics"
                    h1='Cumulated Discharged Energy Throughout'
                    v1={`${batteryStatus[0]}%`}
                    h2='Cumulated Charged Energy Throughout'
                    v2={`${batteryStatus[1]}%`}
                    h3='Estimated Remaining Usable Energy Throughout'
                    v3={`${batteryStatus[2]}%`}
                />
            </GridItem>
        </Grid>
        <Grid
            h={305}
            templateRows={"repeat(1, 1fr)"}
            templateColumns={"repeat(3, 1fr)"}
            gap={1}
        >
            <GridItem rowSpan={1} colSpan={2}>
                <ChartLayout
                    title='Degradation Trend'
                    width={["full", "auto"]}
                    height='300px'
                    timeWindow={true}
                    onTimeWindowChange={handleTimeWindowDegradationChange}
                    onReset={DegradationHandleReset}
                >
                    <AreaChart height={260} apiData={DegradationData || [{}]} />
                </ChartLayout>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
                <ChartLayout
                    title='Cell Voltage Delta'
                    width={["full", "auto"]}
                    height='300px'
                    timeWindow={true}
                    onTimeWindowChange={handleTimeWindowVDistributionChange}
                    onReset={VDistributionHandleReset}
                >
                    <ColumnChart  apiData={VDistributionData || [{}]}/>
                </ChartLayout>
            </GridItem>
        </Grid>
        <Grid
            h={'620px'}
            templateRows={"repeat(2, 1fr)"}
            templateColumns={"repeat(2, 1fr)"}
            gap={1}
            mb={5}
        >
            <GridItem rowSpan={1} colSpan={1}>
                <ChartLayout
                    title='Delta V Distribution'
                    width={["full", "auto"]}
                    height='300px'
                    timeWindow={true}
                    onTimeWindowChange={handleTimeWindowCellVChange}
                    onReset={CellVHandleReset}
                >
                    <ColumnChart apiData={CellVData || [{}]}/>
                </ChartLayout>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
                <ChartLayout
                    title='Degradation Trend'
                    width={["full", "auto"]}
                    height='300px'
                >
                    <CandlestickChart />
                </ChartLayout>
            </GridItem>
            <GridItem colSpan={2} rowSpan={1}>    
                <PlantViewTableLayout
                    title=''
                    width={["full", "full"]}
                    height='300px'
                >
                    <PlantTable
                        paginationLimitProps={5}
                    />
                </PlantViewTableLayout>
            </GridItem>
        </Grid>
    </Box>
  )
}

export default BESS_HealthDashboard