import {
 Box,
 VStack ,
 Text,
 Table,
 Tbody,
 Tr,
 Td,
 Flex,
 HStack,
 Icon,
} from "@chakra-ui/react";
import ChartLayout from "../Layouts/ChartLayouts/ChartLayout";
import BatteryState from "../../assets/BESS/Overview/BatteryState";
import SparkBarChart from "../widgets/charts/SparkBarChart";
import { CiTempHigh } from "react-icons/ci";
import { BsFillLightningChargeFill } from "react-icons/bs";
import PieChart from "../widgets/charts/PieChart";
import React from "react";

interface StateOfBatteryProps {
    data : string[];
}

export const StateOfBattery : React.FC<StateOfBatteryProps> = ( {data} ) => {
    
    const tableRows = [["Units Available", data[0]], 
                        ["Chargeable Energy ", `${data[1]}kW`],
                        ["Units Running", data[2]],
                        ["Reactive Power", `${data[3]}MVAR`],
                        ["Chargeable Power", `${data[3]}kW`],
                        ["Dischargeable Energy", `${data[3]}kWh`],
                        ["Dischargeable Power", `${data[3]}kW`],
                        ["Apparent Power", `${data[3]}MVA`],
                        ["Active power", `${data[3]}MW`], 
                        ["Grid Forming Voltage Slew", `${data[3]}%/s`]];
    return (
        <ChartLayout
            title="State Of Battery"
            width={["full", "350px"]}
            height="780px"
        >
            <VStack>
                <Box 
                    width={"60%"}
                    my={10}
                >
                    <BatteryState
                        batteryPercentage={"60.00"}
                    />
                </Box>
                <Table variant={"simple"}>
                    <Tbody>
                    {tableRows.map((_, i) => {
                        if (i % 2 === 0 && i + 1 < tableRows.length) {
                            return (
                            <Tr key={i}>
                                <Td 
                                    borderBottom={"none"}
                                    borderTop={"1px solid #C1C1C1"}
                                    borderRight={"1px solid #C1C1C1"}
                                    fontFamily={"inter"}
                                    fontWeight={500}
                                    fontSize={12}
                                    color={"#000000"}
                                    letterSpacing={1}
                                >
                                <VStack align={"left"} spacing={0}>
                                    <Text>{tableRows[i][0]}</Text>
                                    <Text
                                        fontSize={17}
                                        fontWeight={600}
                                        color={"#03BB7D"}
                                    >
                                    {tableRows[i][1]}
                                    </Text>
                                </VStack>
                                </Td>
                                <Td 
                                    borderBottom={"none"}
                                    borderTop={"1px solid #C1C1C1"}
                                    fontFamily={"inter"}
                                    fontWeight={500}
                                    fontSize={12}
                                    color={"#000000"}
                                    letterSpacing={1}
                                >
                                <VStack align={"left"} spacing={0}>
                                    <Text>{tableRows[i+1][0]}</Text>
                                    <Text
                                        fontSize={17}
                                        fontWeight={600}
                                        color={"#03BB7D"}
                                    >
                                    {tableRows[i+1][1]}</Text>
                                </VStack>
                                </Td>
                            </Tr>
                            );
                        }
                        return null;
                        })}

                    </Tbody>
                </Table>
            </VStack>
        </ChartLayout>
    );
};

// Some Title Will Change in Future
interface data {
    bar : number[];
    temp : number;
    volt : number
}

interface someTitleProps { 
    apiData? : data[];
}
export const SomeTitle : React.FC <someTitleProps> = ( {apiData = [{bar : [0,0,0], temp : 0, volt : 0}]} ) => {
    
    return (
        <ChartLayout
            title="Some Title"
            width={["full", "400px"]}
            height = "626"
            overflow="auto"
        >
            <Box mt={5}>
                <hr style={{color : "#D7D7D7"}} />
                <Flex 
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                >
                    {apiData.map((_, i) => (
                    <HStack 
                        key={i}
                        border={"1px solid #E4E4E4"} 
                        borderRadius={5} fontFamily={"inter"}
                        alignItems={"center"}
                        spacing={5}
                        px={5}
                        mt={2}
                    >
                        <Text
                            fontSize={12}
                            fontWeight={600}
                            color={"#4B4B4B"}
                        >S0{i+1}.M01</Text>
                        <SparkBarChart apiData={apiData[i].bar || [22,2,22]}/>
                        <HStack spacing={1} mr={3}>
                            <Icon as={CiTempHigh} />
                            <Text
                                fontSize={12}
                                fontWeight={600}
                                color={"#657079"}
                                >{apiData[i].temp || 0}°C</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Icon as={BsFillLightningChargeFill} boxSize={"10px"} />
                            <Text
                                fontSize={12}
                                fontWeight={600}
                                color={"#657079"}
                                >{apiData[i].volt || 0} V</Text>
                        </HStack>
                    </HStack>
                    ))}
                </Flex>
            </Box>
        </ChartLayout>
    );
};

export const BatteryBank = () => {
    return (
        <ChartLayout 
            title="Bank"
            width={["full", "400px"]}
            height="auto"
        >
            <HStack spacing={0}>
                <Box zIndex={2} w={200}>
                    <PieChart />
                </Box>
                <VStack
                    fontFamily={"inter"}
                    fontWeight={600}
                    zIndex={1}
                >
                    <Text
                        color={"#042441"}
                        padding={3}
                        borderBottom={"1px solid #999"}
                        fontSize={12}
                    >MODULE TEMPERATURE </Text>
                    <HStack spacing={2} color={"#000000"} borderBottom={"1px solid #999"} px={"16%"}>
                        <Text
                            py={3}
                        >Min.</Text>
                        <Text
                            py={3}
                            fontSize={18}
                        >31.32°C </Text>
                    </HStack>
                    <HStack spacing={2} color={"#000000"} borderBottom={"1px solid #999"} px={"16%"}>
                        <Text
                            py={3}
                        >Max.</Text>
                        <Text
                            py={3}
                            fontSize={18}
                        >35.42°C </Text>
                    </HStack>
                    <HStack>
                        <VStack
                            borderLeft={"3px solid #03BB7D"}
                            spacing={0}
                            align={"center"}
                        >
                            <Text
                                color={"#000000"}
                                padding={3}
                            >Connected </Text>
                            <Text
                                color={"#000000"}
                            >9 </Text>
                        </VStack>
                        <VStack
                            borderLeft={"3px solid #FA0505"}
                            spacing={0}
                        >
                            <Text
                                color={"#000000"}
                                padding={3}
                            >Disabled </Text>
                            <Text
                                color={"#000000"}
                            >1 </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </HStack>
        </ChartLayout>
    );
};
