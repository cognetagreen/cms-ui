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


interface APIData {
    column : string[];
    dataFromAPI : string[][]; 
  }


const DGDashboard = () => {

    const {
        timeWindow : timeWindowGeneratorTable,
        handleTimeWindowChange : handleTimeWindowGeneratorTableChange,
        handleReset : handleGeneratorTableReset
    } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);

    const searchTag = { DG: "B1_DG_DG_0_AC_Active_Power_Watt" };
    
    const GeneratorTableData = UseGeneratorTable(searchTag, timeWindowGeneratorTable);

    const runtimeWidget = [1,2,3,4,5,6];

    const searchObj = {
        inverter: "B1_Inverter_Inverter_0_AC_Active_Power_Watt"
    };

    const pieData = UseAssetSummary(searchObj) || [];

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
                        value='300'
                    />
                </GridItem>
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Generator Daily Energy'
                        width={["full", "auto"]}
                        height='auto'
                    >
                        <LineChart />
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
                h={265}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={1}
            >
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Generator'
                        width={["full", "auto"]}
                        height='auto'
                    >
                        <LineChart />
                    </ChartLayout>
                </GridItem>
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='Generator Daily Energy'
                        width={["full", "auto"]}
                        height='auto'
                    >
                        <LineChart />
                    </ChartLayout>
                </GridItem>
                <GridItem h={261} w={"auto"} colSpan={1} rowSpan={1}>
                    <ChartLayout
                        title='% Load Power'
                        width={["full", "auto"]}
                        height='277px'
                        icon={FaChartColumn}
                    >
                        <ColumnChart />
                    </ChartLayout>
                </GridItem>
            </Grid>

            <Grid
                mt={5}
                h={275}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(3, 1fr)"}
                gap={1}
                mb={3}
            >
                <GridItem h={271} w={"auto"} colSpan={2} rowSpan={1}>
                    <PlantViewTableLayout
                        title='Generators'
                        width={["full", "auto"]}
                        height='271px'
                        timeWindow={true}
                        onTimeWindowChange = {handleTimeWindowGeneratorTableChange}
                        onReset={handleGeneratorTableReset}
                    >
                        <PlantTable
                            paginationLimitProps={4}
                            apiData={GeneratorTableData || [{ column: [], dataFromAPI: [] }]}
                        />
                    </PlantViewTableLayout>
                </GridItem>
                <GridItem h={271} w={"auto"} colSpan={1} rowSpan={1}>
                    <PlantViewTableLayout
                        title='DG Runtime'
                        width={["full", "450px"]}
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
            </Grid>
    </Box>
  )
}

export default DGDashboard;