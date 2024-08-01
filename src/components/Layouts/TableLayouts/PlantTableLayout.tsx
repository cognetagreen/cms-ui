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
      {/* <HStack justifyContent={"space-around"}> */}
        {/* <HStack>
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
        </HStack> */}
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
                <Tab>All</Tab>
                <Tab>PV</Tab>
                <Tab>Wind</Tab>
                <Tab>PV-BESS</Tab>
                <Tab>PV-DG</Tab>
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
