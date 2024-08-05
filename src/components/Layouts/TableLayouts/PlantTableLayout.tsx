import React from 'react';
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

interface PlantTableLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  width: string[];
  height: string;
}

const PlantTableLayout: React.FC<PlantTableLayoutProps> = ({ children, title, icon, width, height }) => {

  const tabList = ["All", "PV", "Wind", "PV-BESS", "PV-DG"];
  const dotColor = ["transparent","#0086CC", "#F8931F", "#7EC800", "#704199"]

  const stateNumber = [12, 6, 4];
  const stateColor = ["#13CD26", "#CB0511", "#837F97"];
  return (
    <Box
      w={width}
      h={height}
      borderRadius="5px"
      bg={useColorModeValue('white', 'gray.800')}
      p={3}
      mt={5}
      boxShadow="md"
      overflow={"hidden"}
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
                        style={{width:"10px",height:"10px",backgroundColor:dotColor[index], display:`${dotColor[index] == "transparent"? "none" : "flex"}`, borderRadius:"50%", marginRight:"7px"}}
                        ></span>
                      {value}
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
                <TabPanel>
                    <PlantTable />
                </TabPanel>
                <TabPanel>
                    <PlantTable />
                </TabPanel>
                <TabPanel>
                    <PlantTable />
                </TabPanel>
                <TabPanel>
                    <PlantTable />
                </TabPanel>
                <TabPanel>
                    <PlantTable />
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
