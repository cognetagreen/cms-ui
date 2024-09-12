import { lazy, Suspense, useState } from "react";
import {
  Box, 
  Grid, 
  GridItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid
} from "@chakra-ui/react";

import { IoLocation } from "react-icons/io5";
import { FaChartBar, FaChartColumn } from "react-icons/fa6";
import { PiChartDonutFill } from "react-icons/pi";
import { MdGrid4X4 } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import UsePieChart from "../Services/Hooks/UseEnergyYield";
import ChartLayout from "../components/Layouts/ChartLayouts/ChartLayout";
import PlantTable from "../components/widgets/tables/PlantTable";
import StatisticsCard from "../components/widgets/StatisticsCard";
import LocationMapChart from "../components/widgets/charts/LocationMapChart";
import PlantTableLayout from "../components/Layouts/TableLayouts/PlantTableLayout";
import BarChart from "../components/widgets/charts/BarChart";
import ColumnLineChart from "../components/widgets/charts/ColumnLineChart";
import UseAssetSummary from "../Services/Hooks/UseAssetSummary";
import UseColumnLine from "../Services/Hooks/UseColumnLine";
import UseSpecificYield from "../Services/Hooks/UseSpecificYield";
import UseLocationMap from "../Services/Hooks/UseLocationMap";
const DonutPieChart = lazy(() => import('../components/widgets/charts/DonutPieChart'));

const MainDashboard = () => {
  
  const [timeWindow, setTimeWindow] = useState({ startTs: 0, endTs: 0, aggregate: "NONE" });

    const handleTimeWindowChange = (from: string, to: string, aggregate: string) => {
        function inMS (date:string) {
          return new Date(date).getTime();
        }
        var startTs = inMS(from)
        var endTs = inMS(to)

        setTimeWindow({ startTs, endTs, aggregate });
        // console.log(from, to, aggregate)
        // Fetch and update the data based on the new time window
    };

    // ******************LOCATION MAP*********************

    const searchLocationTag = "Plant_Name,AC_Capacity,Latitude,Longitude"
    
    const LocationMapData = UseLocationMap(searchLocationTag);


    // ********************Specific Yield / Ranking Bar Chart ********************

    var textSearch = "Calculation";
    var key = "BP_Plant_Daily_Energy";
    const specificYieldData = UseSpecificYield(textSearch, key);

    // ***********************Energy Yield******************

    var textSearch = "inverter-1";
    const type = { // Line for PV PR only
        column : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz",
        line : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Energy_Total_kWh,B1_Inverter_Inverter_1_Frequency_Hz,B1_Inverter_Inverter_1_Energy_Total_kWh",
    };
    const ColumnLineData = UseColumnLine(textSearch, type) || [{}];

    // *********PIE*************
  var textSearch = "inverter-1";
  var key = "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt,B1_Inverter_Inverter_1_DC_String2_Watt";
  const EnergyYield = UsePieChart(textSearch, key) || [];

  var searchObj = {
    inverter : `B1_Inverter_Inverter_0_AC_Active_Power_Watt`
  }
  const AssetSummary = UseAssetSummary(searchObj) || [];
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
      <SimpleGrid
        // mt={10}
        maxW={"8xl"}
        // h="max"
        minChildWidth={["260px", "400px"]}
        // templateRows="repeat(2, 1fr)"
        // templateColumns="repeat(3, 1fr)"
        gap={1}
      >
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="Location Map"
            width={["auto", "auto"]}
            height={"270px"}
            icon={IoLocation}
            fullScreen={true}
            onTimeWindowChange = {handleTimeWindowChange}
          >
            <LocationMapChart apiData={LocationMapData || [{country : "", lat : 0, long : 0, name : "", type : ""}]} />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="Specific Yield"
            width={["full", "auto"]}
            height={"270px"}
            icon={FaChartBar}
            fullScreen = {true}
            onTimeWindowChange = {handleTimeWindowChange}
          >
            <BarChart apiData={specificYieldData || [{}]}
              barColors={["#0086CC", "#03BB7D"]}
            />
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]}>
          <ChartLayout
            title="Energy Yield"
            width={["full", "auto"]}
            height={"270px"}
            icon={FaChartColumn}
            onTimeWindowChange = {handleTimeWindowChange}
          >
            <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>sddsf</div>}>
              <ColumnLineChart apiData={ColumnLineData || [{}]} />
            </Suspense>
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={2} colSpan={[1, 2]} mt={-3}>
          <PlantTableLayout
            title="Plants"
            icon={MdGrid4X4}
            width={["full", "100%"]}
            height={"550px"}
          >
            <PlantTable
              paginationLimitProps={10}
            />
          </PlantTableLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]} mt={-3}>
          <ChartLayout
            title="Source Contribution"
            width={["full", "auto"]}
            height={"270px"}
            icon={PiChartDonutFill}
            onTimeWindowChange = {handleTimeWindowChange}
          >
            <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
              <DonutPieChart apiData={EnergyYield}
                pieColors={["#704199", "#0086CC", "#66D1C9", "#F8931F",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                  '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                  '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                  '#03c69b', '#00f194']}
              />
            </Suspense>
          </ChartLayout>
        </GridItem>
        <GridItem rowSpan={[1, 1]} colSpan={[3, 1]} mt={-4}>
          <ChartLayout
            title="Asset Summary"
            width={["full", "auto"]}
            height={"270px"}
            icon={PiChartDonutFill}
            onTimeWindowChange = {handleTimeWindowChange}
          >
            <Suspense fallback={<div style={{position:"relative", top : "45%", left : "45%"}}>Loading...</div>}>
              <DonutPieChart  apiData={AssetSummary}
                pieColors={["#704199", "#0086CC", "#66D1C9", "#F8931F",'#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                  '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                  '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                  '#03c69b', '#00f194']}
              />
            </Suspense>
          </ChartLayout>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default MainDashboard;
