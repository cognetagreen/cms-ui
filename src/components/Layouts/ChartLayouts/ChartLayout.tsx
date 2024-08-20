import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {RxCounterClockwiseClock} from 'react-icons/rx'
import { TimeWindow } from '../../../Services/TimeWindow';

interface ChartLayoutProps {
  children: React.ReactNode;
  title: string;
  bg? : string;
  icon?: IconType | undefined;
  width: string[];
  height: string;
  px? : string;
  timeWindow? : boolean;
  onTimeWindowChange?: (from: string, to: string, aggregate: string, interval : number) => void;
  onReset? : (Reset : boolean) => void;
}

const ChartLayout: React.FC<ChartLayoutProps> = ({ children, title, bg, icon, width, height, px, timeWindow, onTimeWindowChange, onReset }) => {
  const iconColor = useColorModeValue('#004F86', 'white');
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
      overflow={"hidden"}
      bg = {bg}
    >
      <Flex justifyContent={"space-between"}>
        <HStack>
          {icon && (
            <Icon as={icon} boxSize={5} color={iconColor} />
          )}
          <Text 
          fontSize={"sm"}
          fontFamily={"inter"} 
          fontWeight={600} 
          color={useColorModeValue('#004F86', 'white')}
          letterSpacing={1}
          >{title}</Text>
        </HStack>
        {timeWindow && <IconButton
                aria-label='Time Window'
                icon={<RxCounterClockwiseClock />}
                onClick={onOpen}
        />}
        <TimeWindow isOpen={isOpen} onClose={onClose} onReset={onReset || (()=>{})}  onSave={onTimeWindowChange || (()=>{})} />
      </Flex>
      <Box as='main' pb={6} height={"full"} width={"full"} _dark={{color : "white"}}>
        {children}
      </Box>
    </Box>
  );
};

export default ChartLayout;
