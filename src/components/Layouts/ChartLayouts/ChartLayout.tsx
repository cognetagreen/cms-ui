import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface ChartLayoutProps {
  children: React.ReactNode;
  title: string;
  bg? : string;
  icon?: IconType;
  width: string[];
  height: string;
  px? : string;
}

const ChartLayout: React.FC<ChartLayoutProps> = ({ children, title, bg, icon, width, height, px }) => {
  return (
    <Box
      w={width}
      h={height}
      borderRadius="5px"
      bgColor={useColorModeValue('white', 'gray.800')}
      p={3}
      px={px}
      mt={5}
      boxShadow="md"
      overflow={"hidden"}
      bg = {bg}
    >
      <HStack>
        <Icon as={icon} boxSize={5} color={useColorModeValue('#004F86', 'white')}/>
        <Text 
         fontSize={"sm"}
         fontFamily={"inter"} 
         fontWeight={600} 
         color={useColorModeValue('#004F86', 'white')}
         letterSpacing={1}
         >{title}</Text>
      </HStack>
      <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}}>
        {children}
      </Box>
    </Box>
  );
};

export default ChartLayout;
