import { 
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import { Fieldset_Devices, Fieldset_kW52860, Fieldset_Mode, Fieldset_Power, Fieldset_State, Fieldset_Temp } from '../components/widgets/FieldsetContent'
import { FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import { h, html } from 'gridjs'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseAlarmLiveTable from '../Services/Hooks/Alarm/UseAlarmLiveTable'
import swal from 'sweetalert'
import AlarmAckClrAPI from '../api/Alarm/AlarmAckClrAPI'


const AlarmDashboard = () => {

    const handleClick = async (id : string, eventName : string, event : string) => {
        const val = await swal(`Are you sure want to do ${eventName}?`, {buttons : ["No", true]});
        // console.log(Promise.resolve(val))
        if((val)) {
            const responseAlarmEvent = await AlarmAckClrAPI(id, event);
            // console.log(responseAlarmEvent)
            if (responseAlarmEvent?.status == 200) {
                await swal("Acknowledged!", "Alarm Event Successfull!", "success");
                window.location.reload();
            } else {
                swal("Error!", "Alarm Event Unsuccessfull!", "error");
            }
            // console.log(9000);
            
        }else {
            // console.log(8000)
        }
    }
    
    // ******************** Alarm Table ***********************

    const {
        timeWindow : timeWindowAlarmLiveTable,
        handleTimeWindowChange : handleTimeWindowAlarmLiveTableChange,
        handleReset : handleAlarmLiveTableReset
    } = useTimeHandle(1, "day", "NONE", [1, "day"]);
    
    var searchDev = "summation"
    var AlarmColumn = ["Device", {
        name : "Created Time",
        formatter : (cell : any) => new Date(parseInt(cell)).toLocaleString().substring(0, 19).replace(",", "")
    }, "Type", "Severity", {
        name : "Status",
        formatter : (cell : string) => cell.replace("_", " ")
    }, {
        name : "Assignee",
        formatter : (cell : any) => cell === null? "Unassigned" : cell
    }, {name : "ACK", formatter: (cell : any, row: any) => {
        if(cell !== null) {
            return h('button', {
                style : {color : "white", background : "blue", padding : "5px", borderRadius : "10px", fontFamily:"inter", fontWeight : 600, letterSpacing : "1px"},
                onClick : () => handleClick(cell, "send acknowledge", "ack")
            }, 'ACK')
        }else {
            return h('button', {
                style : {color : "white", background : "gray", padding : "5px", borderRadius : "10px", fontFamily:"inter", fontWeight : 600, letterSpacing : "1px"},
            }, 'ACK')
        }
    }},
    {
        name : "Clear",
        formatter : (cell : any, row : any) => {
            if(cell !== null) {
                return h('button', {
                    style : {color : "white", background : "red", padding : "5px", borderRadius : "10px", fontFamily:"inter", fontWeight : 600, letterSpacing : "1px"},
                    onClick : () => handleClick(cell, "clear alarm", "clear")
                }, 'CLR')
            }else {
                return h('button', {
                    style : {color : "white", background : "gray", padding : "5px", borderRadius : "10px", fontFamily:"inter", fontWeight : 600, letterSpacing : "1px"},
                }, 'CLR')
            }
        }
    }]

    const AlarmLiveTable = UseAlarmLiveTable(searchDev, timeWindowAlarmLiveTable) as any;
    // console.log("AlarmLiveTable", AlarmLiveTable);
    
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
                    <BreadcrumbLink color="rgba(0, 79, 134, 1)" fontWeight={600} fontSize={12} as={Link} to="/alarm">
                        Alarm
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
                h={600}
                templateRows={"repeat(1, 1fr)"}
                templateColumns={"repeat(1, 1fr)"}
                gap={1}
                mb={3}
            >
                <GridItem h={600} w={"auto"} colSpan={1} rowSpan={1}>
                    <PlantViewTableLayout
                        title='Inerters'
                        width={["full", "auto"]}
                        height='600px'
                        timeWindow={true}
                        onTimeWindowChange={handleTimeWindowAlarmLiveTableChange}
                        onReset={handleAlarmLiveTableReset}
                    >
                        <PlantTable 
                            paginationLimitProps={12}
                            column={AlarmColumn}
                            apiData={AlarmLiveTable || []}
                        />
                    </PlantViewTableLayout>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default AlarmDashboard;