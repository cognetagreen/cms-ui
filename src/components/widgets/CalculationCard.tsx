import React from 'react'
import {
    Box,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    TabIndicator,
    Flex,
    Text
} from '@chakra-ui/react'
// import Assets from '../../assets/GridCardBG/assets';
import BG from '../../assets/GridCardBG/BG.svg'
import Assets from '../../assets/GridCardBG/Assets.svg'

const CalculatedCardContent:React.FC = () => {
    const data = [
        ["Grid kW", "Grid Hz", "Consumption kWh", "Feed kWh"],
        [299.79, 131, 49, 9999999.99]
    ]
    return (
        <Box>
            {data[0].map((label, index) => (
                <Flex key={index} mx={-5} justifyContent="space-between">
                <Text color={"#4A4A4A"} fontWeight={400} fontSize={12}>{label}</Text>
                <Text color={"#8842E0"} fontWeight={600} fontSize={12}>{data[1][index]}</Text>
                </Flex>
            ))}
        </Box>
    )
}

interface CalculationCardProps {
    // CalculatedCardContent : JSX.Element
}

const CalculationCard:React.FC<CalculationCardProps> = ({}) => {
  return (
    <Tabs position='relative' variant='unstyled' >
  <TabList color={"#8842E0"}>
    <Tab fontSize={12} fontWeight={600}>Daily</Tab>
    <Tab fontSize={12} fontWeight={600}>Monthly</Tab>
    <Tab fontSize={12}fontWeight={600}>Yearly</Tab>
  </TabList>
  <TabIndicator mt='-1.5px' height='2px' bg='#8842E0' borderRadius='1px' />
  <TabPanels>
    <TabPanel>
      <CalculatedCardContent />
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
  )
}

export default CalculationCard