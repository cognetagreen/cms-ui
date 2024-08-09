import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface PlantViewTableLayoutProps {
  children: React.ReactNode;
  title: string;
  bg? : string;
  width: string[];
  height: string;
  px? : string;
}

const PlantViewTableLayout: React.FC<PlantViewTableLayoutProps> = ({ children, title, bg, width, height, px }) => {
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
      overflow={"auto"}
      bg = {bg}
    >
      <HStack height={"40px"}>
        <Text 
         fontSize={"sm"}
         fontFamily={"inter"} 
         fontWeight={600} 
         color={useColorModeValue('#004F86', 'white')}
         letterSpacing={1}
         mt ={-5}
         ml={5}
         >{title}</Text>
      </HStack>
      <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}}>
        {children}
      </Box>
    </Box>
  );
};

export default PlantViewTableLayout;
