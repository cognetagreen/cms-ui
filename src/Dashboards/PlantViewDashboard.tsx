import React from 'react';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
  } from '@chakra-ui/react';
  import { FaCaretRight } from 'react-icons/fa';
  import { Link } from 'react-router-dom';
  import FieldsetLayout from '../components/Layouts/FieldsetLayout';
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
  const PlantViewDashboard = () => {
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
            <Box my={5}>
                <ChartLayout
                    width={["full", "100%"]}
                    height='265px'
                    title='Plant'
                    px='0'
                    icon={PiFlowArrowBold}
                >
                    <PowerFlowSVG
                        SolarValue={100}
                        DGValue={200}
                        GridValue={300}
                        LoadValue={400}
                    />
                </ChartLayout>
            </Box>
            <Grid
                h={"auto"}
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(3, 1fr)"
                gap={1}
                mb={0}
            >
                <GridItem h={300}>
                    <PlantViewCalculationCardLayout
                        width={["full", "auto"]}
                        height='full'
                        title='Solar'
                        bg={`url(${SolarBG}) no-repeat center/cover`}
                    />
                </GridItem>
                <GridItem h={300}>
                    <PlantViewCalculationCardLayout
                        width={["full", "auto"]}
                        height='full'
                        title='DG'
                        bg={`url(${DGBG}) no-repeat center/cover`}
                    />
                </GridItem>
                <GridItem h={300}>
                    <PlantViewCalculationCardLayout
                        width={["full", "auto"]}
                        height='full'
                        title='Grid'
                        bg={`url(${GridBG}) no-repeat center/cover`}
                    />
                </GridItem>
            </Grid>
            <Grid
                h={"auto"}
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={1}
                // mb={0}
            >
                <GridItem w={"auto"}>
                    <ChartLayout
                        title='Power Curve'
                        width={["full", "auto"]}
                        height='317px'
                        icon={FaChartArea}
                    >
                        <AreaSplineChart />
                    </ChartLayout>
                </GridItem>
                <GridItem w={"auto"}>
                    <ChartLayout
                        title=''
                        width={["full", "auto"]}
                        height='317px'
                        icon={FaChartColumn}
                    >
                        <ColumnChart />
                    </ChartLayout>
                </GridItem>
            </Grid>
            <Grid 
                h={410}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(2, 1fr)"
                gap={1}
                mb={4}
            >
                <GridItem colSpan={1} rowSpan={2} height={404} w={"auto"}>
                    <PlantViewTableLayout
                     title='Inverter'
                     width={["full", "100%"]}
                     height='400px'
                    >
                
                        <PlantTable 
                            paginationLimitProps={8}
                        />
                    </PlantViewTableLayout>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} height={150}>
                    <PlantViewTableLayout
                     title='Inverter'
                     width={["full", "100%"]}
                     height='150px'
                    >
                        <PlantTable 
                            paginationLimitProps={5}
                        />
                    </PlantViewTableLayout>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} h={244} mt={-12}>
                    <PlantViewTableLayout
                     title='Inverter'
                     width={["full", "100%"]}
                     height='244px'
                    >
                        <PlantTable 
                            paginationLimitProps={5}
                        />
                    </PlantViewTableLayout>
                </GridItem>
            </Grid>
      </Box>
    );
  };
  
  export default PlantViewDashboard
  