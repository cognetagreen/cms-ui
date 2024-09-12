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

    var searchGridCard = '[{"columns" : "Key","values" : "B1_Inverter_Inverter_2_AC_Active_Power","status" : 0},{"columns" : "Key","values" : "B1_Inverter_Inverter_2_DC_String1_Volt","status" : 0},{"columns" : "Key","values" : "INV_Total_Power_cal","status" : 1}]'
    var DataLabel = ["PV Power kW", "PV Generation kWh", "PV Lifetime Generation MWh", "CUF %", "CO2 Saving Tons"]
    const PlantCardData = UsePlantCard(searchGridCard, DataLabel) || [[]];
    // console.log("PlantCardData", PlantCardData)

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
    // useEffect(() => {
    //     if (GridVoltData) {
    //         console.log("GridVoltData:", GridVoltData);
    //     }
    // }, [GridVoltData]);

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
    // useEffect(() => {
    //     if (GridPowerData) {
    //         console.log("GridPowerData:", GridPowerData);
    //     }
    // }, [GridPowerData]);

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
    const GridEnergyColors = ["#7E7EC8", "#B3261E","#6ADBFFB2", "#19CA16"]
    const GridEnergyData = UseManyDeviceManyKeysChart(searchTagGridEnergy, timeWindowGridEnergy)?.map((series : object, index : number) => ({
        ...series,
        color : GridEnergyColors[index]
    }));
    // useEffect(() => {
    //     if (GridEnergyData) {
    //         console.log("GridEnergyData:", GridEnergyData);
    //     }
    // }, [GridEnergyData]);

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
    // useEffect(() => {
    //     if (GridCurrentData) {
    //         console.log("GridCurrentData:", GridCurrentData);
    //     }
    // }, [GridCurrentData]);


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

{/* ****************** TOP RIBBON ************ */}

        <GridItem colSpan={1} rowSpan={1}
                
                    display={{base : "none", sm : "none", md : "block"}}
                >    
                    <Grid
                        // h={["300px","200px","200px","130px","60px","60px"]}
                        templateRows={["repeat(6, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(2, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)"]}
                        templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(6, 1fr)","repeat(6, 1fr)"]}
                        gap={[1]}
                    >
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, 12]} h={59}>
                            <Fieldset_kW52860 />
                        </GridItem>

                        <GridItem w={"auto"} fontSize={[7, 7, 5, 7, 12, 12]} h={58}>
                            <Fieldset_Mode />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 5, 10, 12, 12]} h={59}>
                            <Fieldset_Power />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, 12]} h={58}>
                            <Fieldset_State />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 9, 12, 12]} h={58}>
                            <Fieldset_Temp />
                        </GridItem>
                        <GridItem w={"auto"} fontSize={[7, 7, 7, 10, 12, 12]}>
                            <Fieldset_Devices />
                        </GridItem>
                    </Grid>
        </GridItem>

          <SimpleGrid
              mt={3}
              maxW={"8xl"}
              h={"min-content"}
              minChildWidth={["300px", "400"]}
              column={4}
              row={1}
              gap={1}
          >
              <GridItem colSpan={1} h={"100%"} mt={5}>
                      <LatestValueCardLayout
                          title={'Grid Power'}
                          deviceLabel='AGC_4'
                          telemetry='AGC_POWER'
                          titleColor='#003F6B'
                          stat={'5,000kW'}
                          unit={" kW"}
                          statColor={"#8842E0"}
                          width={["100%","100%",'80%']}
                          height='30%'
                          w={[59, 89]}
                          h={[59, 89]}
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
                          width={["100%","100%",'80%']}
                          height='30%'
                          statColor={"#8842E0"}
                          w={[59, 89]}
                          h={[59, 89]}
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
                          width={["100%","100%",'80%']}
                          height='30%'
                          statColor={"#8842E0"}
                          w={[59, 89]}
                          h={[59, 89]}
                          bg={"transparent"}
                          border={'2px solid #0FCB44'}
                          src={GridCardIcon}
                          value2={"Last updated just now"}
                          value2Color={'#9B9A9A'}
                          showArrow={false}
                          sparkline={<Box> {/* Add sparkline component here */} </Box>}
                      />
              </GridItem>
              <GridItem h={"100%"} ml={[0, 0, -55]}>
                      <ChartLayout 
                          title='Line 1 Voltage'
                          width={["auto", "100%"]}
                          height={"45%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[0]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 1 Amps'
                          width={["auto", "100%"]}
                          height={"45%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[3]).toFixed(2)) ||0} />
                      </ChartLayout>
              </GridItem>
              <GridItem h={"100%"}>
                      <ChartLayout 
                          title='Line 2 Voltage'
                          width={["auto", "auto"]}
                          height={"45%%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[1]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 2 Amps'
                          width={["auto", "auto"]}
                          height={"45%%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[4]).toFixed(2)) ||0} />
                      </ChartLayout>
              </GridItem>
              <GridItem h={"100%"}>
                      <ChartLayout 
                          title='Line 3 Voltage'
                          width={["auto", "auto"]}
                          height={"45%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[2]).toFixed(2)) ||0} />
                      </ChartLayout>
                      <ChartLayout 
                          title='Line 3 Amps'
                          width={["auto", "auto"]}
                          height={"45%"}
                          icon={GiThunderball}
                      >
                          <DigitalHorizontalBar value={parseFloat((DigitalBarData[5]).toFixed(2)) ||0} />
                      </ChartLayout>
              </GridItem>
          </SimpleGrid>
          <SimpleGrid
              h='auto'
              maxW={"8xl"}
              minChildWidth={["280px", "450px"]}
              column={3}
              mt={-4}
            //   templateRows='repeat(2, 1fr)'
            //   templateColumns='1.5fr 1.5fr 1.5fr 2fr 1.5fr'
              gap={2}
          >
              <GridItem w={["100%", "100px","41%"]} h={"100%"}>
                  <ChartLayout
                      title='Grid Card'
                      width={["100%", "289px"]}
                      height={"280px"}
                      bg={`url(${BG}) no-repeat center/cover`}
                      icon={GridIcon}
                  >
                      <CalculationCard data={PlantCardData} />
                  </ChartLayout>
              </GridItem>
              <GridItem w={["100%", "100px","110%"]} h={"100%"} colSpan={1} ml={[0, 0, -175]}>
                  <ChartLayout
                      title='Grid Voltage & Hz'
                      width={["100%", "100%"]}
                      height={"280px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridVoltChange}
                      onReset={GridVoltHandleReset}
                  >
                      <LineChart apiData={GridVoltData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem w={["100%", "100px","127%"]} h={"100%"} colSpan={1} ml={[0, 0, -125]}>
                  <ChartLayout
                      title='Grid Power'
                      width={["100%", "100%"]}
                      height={"280px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridPowerChange}
                      onReset={GridPowerHandleReset}
                  >
                      <LineChart height={230} apiData={GridPowerData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem w={"100%"} h={"100%"} mt={[0,0,-4]} colSpan={[0,0,2]}>
                  <ChartLayout
                      title='Grid Energy Flow'
                      width={["100%", "100%"]}
                      height={"280px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridEnergyChange}
                      onReset={GridEnergyHandleReset}
                  >
                      <ColumnChart height={230} apiData={GridEnergyData || [{}]} />
                  </ChartLayout>
              </GridItem>
              <GridItem w={"100%"} h={"100%"} mt={[0,0,-4]}>
                  <ChartLayout
                      title='Grid Current'
                      width={["100%", "100%"]}
                      height={"280px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridCurrentChange}
                      onReset={GridCurrentHandleReset}
                  >
                      <LineChart height={230} apiData={GridCurrentData || [{}]} />
                  </ChartLayout>
              </GridItem>
          </SimpleGrid>
      </Box>
   );
};

export default GridDashboard;
