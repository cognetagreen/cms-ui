import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
    SimpleGrid,
} from '@chakra-ui/react'
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent'
import { FaCaretRight, FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ChartLayout from '../components/Layouts/ChartLayouts/ChartLayout'
import LineChart from '../components/widgets/charts/LineChart'
import BatteryDigitalProgressBar from '../assets/BESS/KPI/BatteryDigitalProgressBar'
import BarLineChart from '../components/widgets/charts/BarLineChart'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseBESSDaily from '../Services/Hooks/Battery/UseBESSDaily'
import { useEffect } from 'react'
import UseBatteryStatus from '../Services/Hooks/Battery/UseBatteryStatus'
import { FcLineChart } from 'react-icons/fc'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import UsePlanViewTable from '../Services/Hooks/PlantView/UsePlantViewTable'

const BESS_KPIDashboard = () => {
    

    // ******************BESS Cumulative *******************
    const {
        timeWindow: timeWindowCumulative,
        handleTimeWindowChange: handleTimeWindowCumulativeChange,
        handleReset: CumulativeHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);

    var searchTagCumulative = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["spline"],
        name : ["MIN", "MAX"]
    };
    const CumulativeColor = ["#3853A5", "#F4B725"];
    const CumulativeData = UseBESSDaily(searchTagCumulative, timeWindowCumulative)?.map((series : object, index : number) => ({
        ...series,
        color : CumulativeColor[index]
    }));
    // useEffect(() => {
    //     if (CumulativeData) {
    //         console.log("CumulativeData:", CumulativeData);
    //     }
    // }, [CumulativeData]);

    // ************************ DailDischargey********************
    const {
        timeWindow: timeWindowDailyDischarge,
        handleTimeWindowChange: handleTimeWindowDailyDischargeChange,
        handleReset: DailyDischargeHandleReset
    } = useTimeHandle(5, "hour", "AVG", [1, "hour"]);
    
    var searchTagDailyDischarge = { 
        devName : "Inverter-1",
        keys: "B1_Inverter_Inverter_1_DC_String2_Volt,B1_Inverter_Inverter_1_DC_String3_Volt",
        type : ["bar", "spline"],
        name : ["String2 Volt", "String3 Volt"]
    };
    const DailyDischargeColor = "#0086CC";
    const DailyDischargeData = UseBESSDaily(searchTagDailyDischarge, timeWindowDailyDischarge)?.map((series : object, index : number) => ({
        ...series,
        color : DailyDischargeColor
    }));
    // useEffect(() => {
    //     if (DailyDischargeData) {
    //         console.log("DailyDischargeData:", DailyDischargeData);
    //     }
    // }, [DailyDischargeData]);

    // **************************** CARDS ******************

    var search = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt,B1_Inverter_Inverter_1_Active_Power_referance,B1_Inverter_Inverter_1_DC_String1_Watt",
    }
    const batteryStatus = UseBatteryStatus(search) || [];

    var search1 = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt",
        special : "7daysSOCavg"
    }
    const batteryStatusSoc = UseBatteryStatus(search1) || [];
    console.log(1, batteryStatusSoc)

    var search2 = {
        devName : "inverter-1",
        keys : "B1_Inverter_Inverter_1_DC_String1_Volt,",
        special : "temp30"
    }
    const batteryStatus2 = UseBatteryStatus(search2) || [];
    // console.log(2, batteryStatus2)



        // ********************* Grid Voltage & Hz *********************
        const {
            timeWindow: timeWindowGridVolt,
            handleTimeWindowChange: handleTimeWindowGridVoltChange,
            handleReset: GridVoltHandleReset
        } = useTimeHandle(1, "cdsf", "AVG", [5, "minute"]);
    
        
        var searchTagGridVolt = { 
            devName : "BESS", // cal
            keys : "BESS1_VOLT_L1_L2,BESS1_VOLT_L2_L3,BESS1_VOLT_L3_L1,BESS1_HZ_L1",
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
            devName : "BESS",
            keys : "BESS1_AMP_L1,BESS1_AMP_L2,BESS1_AMP_L3,BESS1_PF",
            type : ["spline","spline","spline","spline"],
            name : ["L1 kW","L2 kW","L3 kW","PF"]
        };
        const GridPowerData = UseBESSDaily(searchTagGridPower, timeWindowGridPower);
        // useEffect(() => {
        //     if (GridPowerData) {
        //         console.log("GridPowerData:", GridPowerData);
        //     }
        // }, [GridPowerData]);

        // ******************** PV Meter Table ***********************
    
    var searchPVMeterTable = {
        BESS : "BESS1_POWER,BESS1_REACTIVE_POWER,BESS1_ENERGY_DAILY,BESS1_APPARENT_POWER,BESS1_VOLT_L1_L2,BESS1_VOLT_L2_L3,BESS1_VOLT_L3_L1,BESS1_HZ_L1"
    }
    var PVMeterColumn = ["Name", "Power kW", "Reactive Power", "Energy", "Apparent Power", "L1 Amps", "L2 Amps", "L3 Amps", "Frequency Hz"]

    const PVMeterTableData = UsePlanViewTable(searchPVMeterTable) as any;
    

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

{/* ****************** TOP RIBBON ************ */}

        <GridItem 
                
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

        <Grid
            templateRows={"repeat(2, 1fr)"}
            templateColumns={"repeat(4, 1fr)"}
            gap={1}
            mt={10}
        >
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Daily Depth of Discharge'
                    value={`${100 - batteryStatus[0]}%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Daily DC Discharge Energy'
                    value={`${batteryStatus[1]}%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Reliability'
                    value={`${((batteryStatus[2] - (2*5)*100)/12).toFixed(2)}%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Availability'
                    value={`${(batteryStatus[2] * 100) / 12}%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Average SOC'
                    value={`${batteryStatusSoc[0]} aw%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Resting SOC'
                    value={`${batteryStatus[2]}aw%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Average C-Rate'
                    value={`${batteryStatus[2] / 12}aw%`}
                />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} height={"auto"} width={"auto"}>
                <BatteryDigitalProgressBar
                    title='Temperature within Warranty Range'
                    value={`${batteryStatus2}aw%`}
                />
            </GridItem>
            
        </Grid>
        <SimpleGrid
            // templateRows={"repeat(1, 1fr)"}
            // templateColumns={"repeat(2, 1fr)"}
            h={"min-content"}
            minChildWidth={["300px","500px"]}
            gap={1}
            mt={0}
        >
            <GridItem >
                <ChartLayout
                    title='Daily Discharge Energy'
                    width={["full", "auto"]}
                    height='260px'
                    timeWindow={true}
                    onTimeWindowChange={handleTimeWindowDailyDischargeChange}
                    onReset={DailyDischargeHandleReset}
                >
                    <BarLineChart height={250} apiData={DailyDischargeData || [{}]}/>
                </ChartLayout>
            </GridItem>
            <GridItem >
                  <ChartLayout
                      title='Grid Voltage & Hz'
                      width={["auto", "100%"]}
                      height={"260px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridVoltChange}
                      onReset={GridVoltHandleReset}
                      fullScreen={true}
                  >
                      <LineChart height={230} apiData={GridVoltData || [{}]} />
                  </ChartLayout>
              </GridItem>
                  <GridItem w={"100%"}>
                        <PlantViewTableLayout
                            title='BESS'
                            width={["full", "100%"]}
                            height='260px'
                        >
                            <PlantTable
                                paginationLimitProps={5}
                                column={PVMeterColumn}
                                apiData={PVMeterTableData || []}
                            />
                        </PlantViewTableLayout>
                    </GridItem>
              <GridItem>
                  <ChartLayout
                      title='Grid Power'
                      width={["auto", "100%"]}
                      height={"260px"}
                      icon={FcLineChart}
                      timeWindow={true}
                      onTimeWindowChange={handleTimeWindowGridPowerChange}
                      onReset={GridPowerHandleReset}
                      fullScreen={true}
                  >
                      <LineChart height={220} apiData={GridPowerData || [{}]} />
                  </ChartLayout>
              </GridItem>
        </SimpleGrid>
    </Box>
  )
}

export default BESS_KPIDashboard;