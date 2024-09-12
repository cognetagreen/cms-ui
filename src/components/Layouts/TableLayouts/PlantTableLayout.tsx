import React, { useEffect, useState } from 'react';
import {
  Box,
  HStack,
  Icon,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel, 
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import PlantTable from '../../widgets/tables/PlantTable';
import { html } from 'gridjs';
import UsePlantTable from '../../../Services/Hooks/UsePlantTable';
import UseAssetSummary from '../../../Services/Hooks/UseAssetSummary';
import UsePlantTableSummary from '../../../Services/Hooks/UsePlantTableSummary';

interface PlantTableLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  width: string[];
  height: string;
}
// ***************PV***********
const PlantTableLayout: React.FC<PlantTableLayoutProps> = ({ children, title, icon, width, height }) => {
  var textSearch = "PV";
  var searchTags = {
    calculation : "INV_Total_Power_cal,AC Capacity,DG Make & Model,Country",
    "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz"
  }
  const PVData = UsePlantTable(searchTags, textSearch) as any;

  // **************Hybrid***************
  var textSearch = "Hybrid";
  var searchTags = {
    calculation : "BP_Plant_Daily_Energy,AC Capacity,DG Make & Model,Country",
    "inverter-1" : "B1_Inverter_Inverter_1_AC_Active_Power_Watt,B1_Inverter_Inverter_1_Frequency_Hz" 
  }
  const HybridData = UsePlantTable(searchTags, textSearch) as any;
  
  // *****************Summary*************
  var textSearchSummary = ["kW", "PV", "Wind", "Hybrid"];
  var searchTagsSummary = {
    calculation : "INV_Total_Power_cal"
  }
  const PlantTableSummaryData = UsePlantTableSummary(searchTagsSummary, textSearchSummary) || [];

  const stateNumber : number[] = PlantTableSummaryData[0] || [0,0,0] as number[];
  const PVSummary = PlantTableSummaryData[1] || [0,0,0,0] as number[];
  const WindSummary = PlantTableSummaryData[2] || [0,0,0,0] as number[];
  const HybridSummary = PlantTableSummaryData[3] || [0,0,0,0] as number[];


  const stateColor = ["#13CD26", "#CB0511", "#837F97"];
  
  const tabList = ["PV", "Wind", "Hybrid"];
  const dotColor = ["#0086CC", "#F8931F", "#704199"] // "#7EC800"
  
  
  const handleBorderColor = (data : number) => {
    if(data > 0) {
      return "#13CD26";
    } else if(data == 0) {
      return "#CB0511";
    } else {
      return "#837F97";
    }
  }
  return (
    <Box
      w={width}
      h={height}
      borderRadius="5px"
      bg={useColorModeValue('white', 'gray.800')}
      p={3}
      mt={5}
      boxShadow="md"
      overflow={"auto"}
    >
      
          <Tabs variant='solid-rounded' colorScheme='gray'>
            <TabList>
                <HStack mr={10}>
                    <Icon as={icon} boxSize={5} color={useColorModeValue('#004F86', 'white')}/>
                    <Text 
                    fontSize={"sm"}
                    fontFamily={"inter"} 
                    fontWeight={600} 
                    color={useColorModeValue('#004F86', 'white')}
                    letterSpacing={1}
                    pl={3}
                    >
                        {title}
                    </Text>
                </HStack>
                {tabList.map((value, index) =>(
                  <Tab 
                  mx={1} 
                  px={3}
                  fontSize={14}
                    >
                      <span 
                        style={{width:"10px",height:"10px",backgroundColor:dotColor[index], display:"flex", borderRadius:"50%", marginRight:"7px"}}
                        ></span>
                      <Text>{value}</Text> &nbsp; <sub><b style={{color : "red"}}>{PlantTableSummaryData[index+1]?.[2] || 0}</b>/{PlantTableSummaryData[index+1]?.[0] || 0}</sub>  
                  </Tab>
                ))}

                <Flex ml={6} bg={"#EBEBEB"} borderRadius={"15%"} px={2}>
                  {stateNumber.map((value, index) => (
                  <HStack>
                    <span
                      style={{width:"14px",height:"14px", borderRadius:"2px",backgroundColor:stateColor[index], color:"#5A5A5A"}}
                    ></span>
                    <Text ml={-1} mr={2}>{value}</Text>
                  </HStack>
                  ))}
                </Flex>
            </TabList>
            <TabPanels>
                <TabPanel overflow={"visible"}>
                    <PlantTable
                     column={[{name : "Plant Name", width : 150, formatter: (cell : any, row: any) => html(`<b style="padding: 4px; margin-left:4px; border-left:4px solid ${handleBorderColor(parseFloat(row.cells[5].data))};" >${cell}</b>`)}, {name : "Type", width : 100, sort : true}, {name : "Energy System", width : 130}, {name : "Capacity", width : 100}, {name : "Country", width : 100}, {name : "PV Power", width : 100, formatter : (cell : any) => cell == "-1" ? "NA" : cell}, {name : "Irradiation", width : 100}, {name : "PV Today kWh", width : 130}, {name : "PR", width : 70}, {name : "Availability", width : 120}]}
                     apiData={PVData || []}
                     paginationLimitProps={10}
                    />
                </TabPanel>
                <TabPanel overflow={"visible"}>
                    <PlantTable 
                      paginationLimitProps={10}
                    />
                </TabPanel>
                <TabPanel overflow={"visible"}>
                    <PlantTable 
                      column={[{name : "Plant Name", width : 150, formatter: (cell : any, row: any) => html(`<b style="padding: 4px; margin-left:4px; border-left:4px solid ${handleBorderColor(parseFloat(row.cells[7].data))};" >${cell}</b>`)}, {name : "Type", width : 100, sort : true}, {name : "Energy System", width : 130}, {name : "PV Capacity", width : 120}, {name : "BESS Capacity", width : 120}, {name : "DG Capacity", width : 120}, {name : "Country", width : 100}, {name : "PV Power", width : 100, formatter : (cell : any) => cell == "-1" ? "NA" : cell}, {name : "Irradiation", width : 100}, {name : "PV Today kWh", width : 130}, {name : "BESS Power", width : 120}, {name : "BESS Discharge kWh", width : 160}, {name : "DG Power", width : 100}, {name : "DG Today kWh", width : 130},{name : "PR", width : 70}, {name : "Availability", width : 120}]}
                      apiData={HybridData || []}
                      paginationLimitProps={10}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
      {/* </HStack> */}
      {/* <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}}>
        {children}
      </Box> */}
    </Box>
  );
};

export default PlantTableLayout;
