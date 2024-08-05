import { 
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink 
} from '@chakra-ui/react';
import GridCardIcon from "../assets/StatisticsCardImage/GridCardIcon.png";
import LatestValueCardLayout from '../components/Layouts/LatestValueCardLayout';
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout';
import DigitalHorizontalBar from '../components/widgets/charts/DigitalHorizontalBar';
import { GiThunderball } from "react-icons/gi";
import CalculationCard from '../components/widgets/CalculationCard';
import LineChart from '../components/widgets/charts/LineChart';
import ColumnBarChart from '../components/widgets/charts/ColumnLineChart';
import BG from '../assets/GridCardBG/BG.svg'
import GridIcon from '../assets/GridCardBG/GridIcon';
import { FcLineChart } from "react-icons/fc";
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const GridDashboard = () => {
  return (
      <Box maxW="full" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
        <Breadcrumb spacing="8px" separator={<FaCaretRight color="gray.500" />} mb={5}>
        <BreadcrumbItem color="rgba(0, 79, 134, 1)" fontSize={12}>
          <BreadcrumbLink>
            Home
          </BreadcrumbLink>
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
            Portfolio
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

          <Grid
            //   mt={10}
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap={2}
          >
              <GridItem colSpan={1} rowSpan={2}>
                  <SimpleGrid minChildWidth='289px' spacing={{ base: 3, lg: 3 }}>
                      <LatestValueCardLayout
                          title={'PV Power'}
                          deviceLabel='Cal'
                          telemetry='BP_Plant_Daily_Energy'
                          titleColor='#003F6B'
                          stat={'5,000kW'}
                          statColor={"#8842E0"}
                          w={[59, 49]}
                          h={[59, 49]}
                          bg={"transparent"}
                          border={'2px solid #0FCB44'}
                          src={GridCardIcon}
                          value2={"Last updated just now"}
                          value2Color={'#9B9A9A'}
                          showArrow={false}
                          sparkline={<Box> {/* Add sparkline component here */} </Box>}
                      />
                      <LatestValueCardLayout
                          title={'Daily Energy'}
                          deviceLabel='Calculation'
                          telemetry='BP_Plant_Daily_Energy'
                          titleColor='#003F6B'
                          stat={'1,000,000kW'}
                          statColor={"#8842E0"}
                          w={[59, 49]}
                          h={[59, 49]}
                          bg={"transparent"}
                          border={'2px solid #0FCB44'}
                          src={GridCardIcon}
                          value2={"Last updated just now"}
                          value2Color={'#9B9A9A'}
                          showArrow={false}
                          sparkline={<Box> {/* Add sparkline component here */} </Box>}
                      />
                      <LatestValueCardLayout
                          title={'Lifetime Energy'}
                          deviceLabel='Cal'
                          telemetry='BP_Plant_Daily_Energy'
                          titleColor='#003F6B'
                          stat={'7kW'}
                          statColor={"#8842E0"}
                          w={[59, 49]}
                          h={[59, 49]}
                          bg={"transparent"}
                          border={'2px solid #0FCB44'}
                          src={GridCardIcon}
                          value2={"Last updated just now"}
                          value2Color={'#9B9A9A'}
                          showArrow={false}
                          sparkline={<Box> {/* Add sparkline component here */} </Box>}
                      />
                  </SimpleGrid>
              </GridItem>
              <GridItem colSpan={4} rowSpan={1} mt={-5}>
                  <SimpleGrid minChildWidth='280px' spacing={{ base: 3, lg: 3 }} columns={3}>
                      <ChartLayout 
                          title='Line 1 Voltage'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 2 Voltage'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 3 Voltage'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                  </SimpleGrid>
              </GridItem>
              <GridItem colSpan={4} rowSpan={1} mt={-5}>
                  <SimpleGrid minChildWidth='280px' spacing={{ base: 3, lg: 3 }} columns={3}>
                      <ChartLayout 
                          title='Line 1 Amps'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 2 Amps'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 3 Amps'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar />
                      </ChartLayout>
                  </SimpleGrid>
              </GridItem>
          </Grid>
          <Grid
              h='auto'
              templateRows='repeat(2, 1fr)'
              templateColumns='1.5fr 1.5fr 1.5fr 2fr 1.5fr'
              gap={2}
          >
              <GridItem colSpan={1} rowSpan={1}>
                  <ChartLayout
                      title='Grid Card'
                      width={["auto", "289px"]}
                      height={"260px"}
                      bg={`url(${BG}) no-repeat center/cover`}
                      icon={GridIcon}
                  >
                      <CalculationCard />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1}>
                  <ChartLayout
                      title='Line Chart'
                      width={["auto", "auto"]}
                      height={"260px"}
                      icon={FcLineChart}
                  >
                      <LineChart />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1}>
                  <ChartLayout
                      title='Line Chart'
                      width={["auto", "auto"]}
                      height={"260px"}
                      icon={FcLineChart}
                  >
                      <LineChart />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={3} rowSpan={1} mt={-5}>
                  <ChartLayout
                      title='Line Chart'
                      width={["auto", "auto"]}
                      height={"auto"}
                      icon={FcLineChart}
                  >
                      <ColumnBarChart />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1} mt={-5}>
                  <ChartLayout
                      title='Line Chart'
                      width={["auto", "auto"]}
                      height={"auto"}
                      icon={FcLineChart}
                  >
                      <LineChart />
                  </ChartLayout>
              </GridItem>
          </Grid>
      </Box>
   );
};

export default GridDashboard;
