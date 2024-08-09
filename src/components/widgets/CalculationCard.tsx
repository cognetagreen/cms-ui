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

interface CalculatedCardContentProps {
  valueIndex : number;
}

const CalculatedCardContent:React.FC<CalculatedCardContentProps> = ({valueIndex}) => {
    const data = [
        ["Grid kW", "Grid Hz", "Consumption kWh", "Feed kWh"],
        [299.79, 131, 49, 9999999.99],
        [399.79, 231, 59, 10999999.99],
        [499.79, 331, 69, 20999999.99]
    ]
    return (
        <Box>
            {data[0].map((label, index) => (
                <Flex key={index} mx={-5} justifyContent="space-between">
                <Text color={"#4A4A4A"} fontWeight={400} fontSize={12}>{label}</Text>
                <Text color={"#8842E0"} fontWeight={600} fontSize={12}>{data[valueIndex][index]}</Text>
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
          <CalculatedCardContent valueIndex={1} />
        </TabPanel>
        <TabPanel>
          <CalculatedCardContent valueIndex={2} />
        </TabPanel>
        <TabPanel>
          <CalculatedCardContent valueIndex={3} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default CalculationCard