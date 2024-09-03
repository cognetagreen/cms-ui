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
import BG from '../assets/GridCardBG/BG.svg'
import GridIcon from '../assets/GridCardBG/GridIcon';
import { FcLineChart } from "react-icons/fc";
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent';
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus';
import UsePlantCard from '../Services/Hooks/PlantView/UsePlantCard';
import { useTimeHandle } from '../Services/TimeWindowSetting';
import { useEffect } from 'react';
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily';
import UseManyDeviceManyKeysChart from '../Services/Hooks/UseManyDeviceManyKeysChart';
import ColumnChart from '../components/widgets/charts/ColumnChart';

const GridDashboard = () => {

    // ************************* Digital Bar Chart ******************

    var search = {
        devName : "Grid", // cal
        keys : "AGC_VOLT_L1_L2,AGC_VOLT_L2_L3,AGC_VOLT_L3_L1,AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3" //GeneratroPower
    }
    const DigitalBarData = UseBatteryStatus(search) || [0,0,0,0,0,0];

    //******************************Grid Card*************** */

    var searchGridCard = {
        devName : "Inverter-2",
        keys : "B1_Inverter_Inverter_2_DC_String1_Volt,B1_Inverter_Inverter_2_Active_Power_referance,B1_Inverter_Inverter_2_DC_String1_Watt,B1_Inverter_Inverter_2_DC_String2_Watt",
        resolution : ["Daily", "Monthly", "Yearly"],
        agg : ["AVG", "SUM"]
    }
    // const plantCardDailyData = UseBatteryStatus(searchGridCard)
    const PlantCardData = UsePlantCard(searchGridCard) || [[]];
    console.log("PlantCardData", PlantCardData)

    // ********************* Grid Voltage & Hz *********************
    const {
        timeWindow: timeWindowGridVolt,
        handleTimeWindowChange: handleTimeWindowGridVoltChange,
        handleReset: GridVoltHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);

    
    var searchTagGridVolt = { 
        devName : "Grid", // cal
        keys : "AGC_VOLT_L1_L2,AGC_VOLT_L2_L3,AGC_VOLT_L3_L1,AGC_HZ_L1",
        type : ["spline","spline","spline","spline"],
        name : ["line-1 V","line-2 V","line-3 V","Hz"]
    };
    const GridVoltData = UseBESSDaily(searchTagGridVolt, timeWindowGridVolt);
    useEffect(() => {
        if (GridVoltData) {
            console.log("GridVoltData:", GridVoltData);
        }
    }, [GridVoltData]);

    // ********************* Grid Power *********************
    const {
        timeWindow: timeWindowGridPower,
        handleTimeWindowChange: handleTimeWindowGridPowerChange,
        handleReset: GridPowerHandleReset
    } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);

    
    var searchTagGridPower = { 
        devName : "Grid",
        keys : "AGC_POWER,AGC_REACTIVE_POWER,AGC_POWER_L1,AGC_POWER_L2,AGC_POWER_L3,AGC_REACTIVE_POWER_L1,AGC_REACTIVE_POWER_L2,AGC_REACTIVE_POWER_L3",
        type : ["spline","spline","spline","spline","spline","spline","spline","spline"],
        name : ["Power kWh","Power kVAR","L1 kW","L2 kW","L3 kW","L1 kVAR","L2 kVAR","L3 kVAR"]
    };
    const GridPowerData = UseBESSDaily(searchTagGridPower, timeWindowGridPower);
    useEffect(() => {
        if (GridPowerData) {
            console.log("GridPowerData:", GridPowerData);
        }
    }, [GridPowerData]);

    // ********************* Grid Energy Flow *********************
    const {
        timeWindow: timeWindowGridEnergy,
        handleTimeWindowChange: handleTimeWindowGridEnergyChange,
        handleReset: GridEnergyHandleReset
    } = useTimeHandle(10, "hour", "AVG", [1, "hour"]);

    
    var searchTagGridEnergy = [{ 
        devName : "Grid",
        keys : "AGC_EXPORT_DAY,AGC_Import_Day",
        type : ["column","column"],
        name : ["Consumption kWh","Feed kWh"]
    },
    {
        devName : "Calculation",
        keys : "Grid_%_Load_Power,INV_%_Load_Power", // Because of '%' it cause problem
        type : ["spline","spline"],
        name : ["Grid Penetration %","PV Penetration %"]   
    }];
    const GridEnergyData = UseManyDeviceManyKeysChart(searchTagGridEnergy, timeWindowGridEnergy);
    useEffect(() => {
        if (GridEnergyData) {
            console.log("GridEnergyData:", GridEnergyData);
        }
    }, [GridEnergyData]);

    // ********************* Grid Current *********************
    const {
        timeWindow: timeWindowGridCurrent,
        handleTimeWindowChange: handleTimeWindowGridCurrentChange,
        handleReset: GridCurrentHandleReset
    } = useTimeHandle(10, "hour", "AVG", [5, "minute"]);

    
    var searchTagGridCurrent = { 
        devName : "Grid", // cal
        keys : "AGC_AMP_L1,AGC_AMP_L2,AGC_AMP_L3",
        type : ["spline","spline","spline"],
        name : ["L1 Amps","L2 Amps","L3 Amps"]
    };
    const GridCurrentData = UseBESSDaily(searchTagGridCurrent, timeWindowGridCurrent);
    useEffect(() => {
        if (GridCurrentData) {
            console.log("GridCurrentData:", GridCurrentData);
        }
    }, [GridCurrentData]);


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
            Grid
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
              mt={8}
              templateRows='repeat(2, 1fr)'
              templateColumns='repeat(5, 1fr)'
              gap={2}
          >
              <GridItem colSpan={1} rowSpan={2}>
                  <SimpleGrid minChildWidth='289px' spacing={{ base: 3, lg: 3 }}>
                      <LatestValueCardLayout
                          title={'Grid Power'}
                          deviceLabel='AGC_4'
                          telemetry='AGC_POWER'
                          titleColor='#003F6B'
                          stat={'5,000kW'}
                          unit={" kW"}
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
                          deviceLabel='AGC_4'
                          telemetry='AGC_EXPORT_DAY'
                          titleColor='#003F6B'
                          stat={'1,000,000kW'}
                          unit=' kWh'
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
                          deviceLabel='AGC_4'
                          telemetry='AGC_Import_Day'
                          titleColor='#003F6B'
                          stat={'7kW'}
                          unit=' kWh'
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
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[0]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 2 Voltage'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[1]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 3 Voltage'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[2]).toFixed(2)) ||0} />
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
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[3]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 2 Amps'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[4]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 3 Amps'
                          width={["auto", "auto"]}
                          height={"172px"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[5]).toFixed(2)) ||0} />
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
                      <CalculationCard data={PlantCardData} />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1}>
                  <ChartLayout
                      title='Grid Voltage & Hz'
                      width={["auto", "auto"]}
                      height={"260px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridVoltChange}
                      onReset={GridVoltHandleReset}
                  >
                      <LineChart apiData={GridVoltData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1}>
                  <ChartLayout
                      title='Grid Power'
                      width={["auto", "auto"]}
                      height={"260px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridPowerChange}
                      onReset={GridPowerHandleReset}
                  >
                      <LineChart height={230} apiData={GridPowerData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={3} rowSpan={1} mt={-5}>
                  <ChartLayout
                      title='Grid Energy Flow'
                      width={["auto", "auto"]}
                      height={"277px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridEnergyChange}
                      onReset={GridEnergyHandleReset}
                  >
                      <ColumnChart height={230} apiData={GridEnergyData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem colSpan={2} rowSpan={1} mt={-5}>
                  <ChartLayout
                      title='Grid Current'
                      width={["auto", "auto"]}
                      height={"277px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridCurrentChange}
                      onReset={GridCurrentHandleReset}
                  >
                      <LineChart height={230} apiData={GridCurrentData || [{}]} />
                  </ChartLayout>
              </GridItem>
          </Grid>
      </Box>
   );
};

export default GridDashboard;
