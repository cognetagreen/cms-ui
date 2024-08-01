import {
  Box,
  Image,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  StatArrow,
  Text,
} from '@chakra-ui/react';
import power from "../../assets/StatisticsCardImage/power.png";
import energy from "../../assets/StatisticsCardImage/energy.png";
import lifetime from "../../assets/StatisticsCardImage/lifttime.png";
import rupee from "../../assets/StatisticsCardImage/rupee.png";
import green from "../../assets/StatisticsCardImage/green.png";
import UseStatisticsCard from '../../Services/Hooks/UseStatisticsCard';
import SparklineChart from './charts/SparkLineChart';

interface StatsCardProps {
  title: string;
  unit : string;
  src: string;
  w: number[];
  h: number[];
  bg: string;
  telemetry: string;
  deviceLabel: string;
}

function StatsCard(props: StatsCardProps) {
  const { title, unit, src, w, h, telemetry, deviceLabel } = props;
  let statValue = UseStatisticsCard(deviceLabel, telemetry, title) || [0, 0];
  let latestValue = Number(statValue[0]);
  let stat = (statValue[1]);
  let data =  statValue[2];

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      bg={"#FFFFFF"}
      _dark={{ bg: "gray.800" }}
      shadow={'xl'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          <Image src={src} w={w} h={h} borderRadius={"50%"} />
        </Box>
        <Box pl={{ base: 2, md: 5 }}>
          <StatLabel fontWeight={'500'} fontSize={12} fontFamily={"inter"} color={"#4A4A4A"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'1xl'} color={"#004F86"} fontWeight={'600'}>
            {latestValue}{unit}
          </StatNumber>
          <Flex alignItems={'center'} >
            <Text ml={1} fontSize={14} fontWeight={600} color={Number(stat)>=0?"green.400":"red.400"}>{stat}%</Text>
            <StatArrow type={Number(stat)>=0?"increase":"decrease"} ml={1} />
          </Flex>
          <Text ml={1} fontFamily={"sans-serif"} fontSize={10} color={useColorModeValue("gray.500", "white")}>Since Yesterday</Text>
        </Box>
        <Box>
          <SparklineChart data = {data} color = {Number(stat)>=0?"#74e874":"#e2581c"}/>
        </Box>
      </Flex>
    </Stat>
  );
}

export default function StatisticsCard() {
  return (
    <Box maxW="8xl">
      <SimpleGrid minChildWidth='210px' spacing={{ base: 3, lg: 3 }}>
        <StatsCard
          title={'PV Power'}
          unit = {"kW"}
          w={[59, 29]}
          h={[59, 29]}
          bg={"#FFECC1"}
          src={power}
          telemetry={"INV_Total_Power"}
          deviceLabel={"calculation"}
        />
        <StatsCard
          title={'Daily Energy'}
          unit = {"kWh"}
          w={[59, 29]}
          h={[59, 29]}
          bg={"#FAE4DE"}
          src={energy}
          telemetry={"Node_SL_PV_Daily_Energy"}
          deviceLabel={"DG"}
        />
        <StatsCard
          title={'Lifetime Energy'}
          unit = {"MWh"}
          w={[59, 29]}
          h={[59, 29]}
          bg={"#EFFFBC"}
          src={lifetime}
          telemetry={"PV_Total_Energy_kWh"}
          deviceLabel={"DG"}
        />
        <StatsCard
          title={'Total Revenue'}
          unit = {"₹"}
          w={[59, 29]}
          h={[59, 29]}
          bg={"#ACE1FF"}
          src={rupee}
          telemetry={"Node_SL_PV_Daily_Energy"}
          deviceLabel={"DG"}
        />
        <StatsCard
          title={'CO2 Saving'}
          unit = {"Tonne"}
          w={[59, 29]}
          h={[59, 29]}
          bg={"#F3F3EB"}
          src={green}
          telemetry = {"SL_Co2_Saving"}
          deviceLabel= {"calculation"}
        />
      </SimpleGrid>
    </Box>
  );
}
