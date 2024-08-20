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
import ColumnChart from '../components/widgets/charts/ColumnChart'
import LineChart from '../components/widgets/charts/LineChart'
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus'

const BESS_OverviewDashboard = () => {

    var search = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt,B1_Inverter_Inverter_1_DC_String2_Watt"
    }
    const batteryStatus = UseBatteryStatus(search) || [];

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
                        >
                            <StackedColumnChart />
                        </ChartLayout>
                    </GridItem>
                    <GridItem mt={-3}>
                        <ChartLayout
                            title='Daily BESS Discharge mWh'
                            width={["full", "650px"]}
                            height='330px'
                            icon={FaChartColumn}
                            timeWindow = {true}
                            
                        >
                            <LineChart />
                        </ChartLayout>
                    </GridItem>
                    <GridItem mt={-3}>
                        <ChartLayout
                            title='Daily BESS Discharge mWh'
                            width={["full", "650px"]}
                            height='280px'
                            icon={FaChartLine}
                        >
                            <LineChart />
                        </ChartLayout>
                    </GridItem>
                </VStack>
                <VStack w={"auto"} spacing={0}>
                    <GridItem>
                        <SomeTitle />
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