import {
   Box,
  HStack, 
  VStack, 
  Grid, 
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from "@chakra-ui/react";
import ChartLayout from "../components/Layouts/ChartLayouts/ChartLayout";
import StatisticsCard from "../components/widgets/StatisticsCard";
import LocationMapChart from "../components/widgets/charts/LocationMapChart";
import DonutPieChart from "../components/widgets/charts/DonutPieChart";
import PlantTableLayout from "../components/Layouts/TableLayouts/PlantTableLayout";
import BarChart from "../components/widgets/charts/BarChart";
import ColumnBarChart from "../components/widgets/charts/ColumnLineChart";
import { IoLocation } from "react-icons/io5";
import { FaChartBar, FaChartColumn } from "react-icons/fa6";
import { PiChartDonutFill } from "react-icons/pi";
import { MdGrid4X4 } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";

const MainDashboard = () => {
  return (
    <Box maxW="full" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
      <Breadcrumb spacing="8px" separator={<FaCaretRight color="gray.500" />} mb={5}>
        <BreadcrumbItem>
          <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontSize={12} fontWeight={600} as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontSize={12} fontWeight={600} as={Link} to="/portfolio">
            Portfolio
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <StatisticsCard />
      <Grid
        // mt={10}
        h="max"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={1}
      >
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="Location Map"
            width={["auto", "auto"]}
            height={"270px"}
            icon={IoLocation}
          >
            <LocationMapChart lat="19.07283000" long="72.88261000" />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="Specific Yield"
            width={["full", "auto"]}
            height={"270px"}
            icon={FaChartBar}
          >
            <BarChart />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="HighCharts"
            width={["full", "auto"]}
            height={"270px"}
            icon={FaChartColumn}
          >
            <ColumnBarChart />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={2} colSpan={[1, 2]} mt={-7}>
          <PlantTableLayout
            title="Plants"
            icon={MdGrid4X4}
            width={["full", "auto"]}
            height={"550px"}
          >
            <DonutPieChart />
          </PlantTableLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]} mt={-7}>
          <ChartLayout
            title="HighCharts"
            width={["full", "463px"]}
            height={"270px"}
            icon={PiChartDonutFill}
          >
            <DonutPieChart />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]} mt={-14}>
          <ChartLayout
            title="HighCharts"
            width={["full", "463px"]}
            height={"270px"}
            icon={PiChartDonutFill}
          >
            <DonutPieChart />
          </ChartLayout>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
