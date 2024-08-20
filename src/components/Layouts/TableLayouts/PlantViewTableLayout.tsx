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
  timeWindow? : boolean;
  onTimeWindowChange?: (from: string, to: string, aggregate: string, interval : number) => void;
  onReset? : (Reset : boolean) => void;
}

const PlantViewTableLayout: React.FC<PlantViewTableLayoutProps> = ({ children, title, bg, width, height, px, timeWindow, onTimeWindowChange, onReset }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {timeWindow && <IconButton
                  aria-label='Time Window'
                  icon={<RxCounterClockwiseClock />}
                  onClick={onOpen}
          />}
          <TimeWindow 
              isOpen={isOpen} 
              onClose={onClose} 
              onSave={onTimeWindowChange || (()=>{})} 
              onReset={onReset || (() => {})}
          />

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
