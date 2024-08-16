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

const BESS_HealthDashboard = () => {

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
                    v1='20'
                    h2='Usable Energy'
                    v2='139.7MWh'
                    h3='SOH'
                    v3='95.5%'
                />
            </GridItem>
            <GridItem>
                <HealthStatus 
                    chart={false}
                    title = "Statistics"
                    h1='Cumulated Discharged Energy Throughout'
                    v1='53.5%'
                    h2='Cumulated Charged Energy Throughout'
                    v2='153.8%'
                    h3='Estimated Remaining Usable Energy Throughout'
                    v3='9123.5%'
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
                >
                    <AreaChart />
                </ChartLayout>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
                <ChartLayout
                    title='Delta V Distribution'
                    width={["full", "auto"]}
                    height='300px'
                >
                    <ColumnChart />
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
                    title='Cell Voltage Delta'
                    width={["full", "auto"]}
                    height='300px'
                >
                    <ColumnChart />
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