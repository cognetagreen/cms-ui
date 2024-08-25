import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import SparkBarChart from "../widgets/charts/SparkBarChart";
import SolidGaugeChart from "../widgets/charts/SolidGuageChart";

interface HealthStatusProps {
    chart : boolean;
    title : string;
    h1 : string;
    h2 : string;
    h3 : string;
    v1 : string;
    v2 : string;
    v3 : string;
}

export const HealthStatus : React.FC<HealthStatusProps> = ({chart, title, h1, h2, h3, v1, v2, v3}) => {
    return (
        <Box
      w="100%"
      h="134px"
      borderRadius="12px"
       bgGradient="linear-gradient(45deg, #001C3C, #023976)"
    >
        <VStack
            fontFamily={"inter"}
            fontWeight={600}
            width={"100%"}
            letterSpacing={"1px"}
            pt={3}
        >
            <Text
                fontSize={17}
                color={"#fff"}
                alignSelf={"flex-start"}
                pl={10}
            >{title}</Text>
            <Box>
                <Flex justifyContent={"space-around"} width={"100%"}>
                    <VStack p={"5px"} px={"30px"} borderRight={"1px solid #657079"}>
                        <Text fontSize={11} color={"#fff"}>{h1}</Text>
                        <Text fontSize={24} color={"#03BB7D"}>{v1}</Text>
                    </VStack>
                    <VStack p={"5px"} px={"30px"} borderRight={"1px solid #657079"}>
                        <Text fontSize={11} color={"#fff"}>{h2}</Text>
                        <Text fontSize={24} color={"#03BB7D"}>{v2}</Text>
                    </VStack>
                    <VStack p={"5px"} px={"30px"}>
                        <Text fontSize={11} color={"#fff"}>{h3}</Text>
                        <Text fontSize={24} color={"#03BB7D"}>{v3}</Text>
                    </VStack>
                    {chart && <SolidGaugeChart />}
                </Flex>
            </Box>
        </VStack>
    </Box>
    );
}