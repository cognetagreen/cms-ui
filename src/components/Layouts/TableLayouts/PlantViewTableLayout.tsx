import React, { useEffect } from 'react';
import {
  Box,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { TimeWindow } from '../../../Services/TimeWindow';
import { RxCounterClockwiseClock } from 'react-icons/rx';

interface PlantViewTableLayoutProps {
  children: React.ReactNode;
  title: string;
  bg? : string;
  width: string[];
  height: string;
  px? : string;
  onTimeWindowChange?: (from: string, to: string, aggregate: string) => void;

}

const PlantViewTableLayout: React.FC<PlantViewTableLayoutProps> = ({ children, title, bg, width, height, px, onTimeWindowChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   if (onTimeWindowChange) {
  //     const now = new Date();
  //     const from = new Date(now.getTime() - 5 * 60 * 1000).toISOString(); // 5 minutes ago
  //     const to = now.toISOString();
  //     const aggregate = 'none';

  //     onTimeWindowChange(from, to, aggregate);
  //     const interval = setInterval(onTimeWindowChange, 300000); // 5-minute interval
  //     return () => clearInterval(interval);
  //   }
  // }, []);

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
      <HStack height={"40px"} spacing={5}>
        <Box mt={-5}>
          <IconButton
                  aria-label='Time Window'
                  icon={<RxCounterClockwiseClock />}
                  onClick={onOpen}
          />
          <TimeWindow isOpen={isOpen} onClose={onClose} onSave={onTimeWindowChange || (()=>{})} />
        </Box>
        <Text 
         fontSize={"16px"}
         fontFamily={"inter"} 
         fontWeight={600} 
         color={useColorModeValue('#004F86', 'white')}
         letterSpacing={1}
         mt ={-5}
         >{title}</Text>
      </HStack>
      <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}}>
        {children}
      </Box>
    </Box>
  );
};

export default PlantViewTableLayout;
