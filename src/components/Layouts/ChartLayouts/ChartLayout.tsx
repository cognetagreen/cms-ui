import React, { useRef, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  Portal,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { TimeWindow } from '../../../Services/TimeWindow';
import { MdFullscreen } from 'react-icons/md';

interface ChartLayoutProps {
  children: React.ReactNode;
  title?: string;
  bg?: string;
  icon?: IconType | undefined;
  fullScreen?: boolean | false;
  width: string[] | number[];
  height: string | string[];
  mt? : string;
  px?: string;
  overflow?: string;
  timeWindow?: boolean;
  onTimeWindowChange?: (
    from: string,
    to: string,
    aggregate: string,
    interval: number
  ) => void;
  onReset?: (Reset: boolean) => void;
}

const ChartLayout: React.FC<ChartLayoutProps> = ({
  children,
  title,
  bg,
  icon,
  fullScreen,
  width,
  height,
  mt,
  px,
  overflow,
  timeWindow,
  onTimeWindowChange,
  onReset,
}) => {
  const iconColor = useColorModeValue('#004F86', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Full Screen Logic
  const chartLayoutRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    if (chartLayoutRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        chartLayoutRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  };

  return (
    <Box
      ref={chartLayoutRef}
      w={isFullscreen ? '100vw' : width} // Adjust width dynamically
      h={isFullscreen ? '100vh' : height} // Adjust height dynamically
      borderRadius="5px"
      bgColor={useColorModeValue('white', 'gray.800')}
      p={3}
      px={px}
      mt={5}
      boxShadow="md"
      overflow={'hidden'}
      bg={bg}
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        <HStack>
          {icon && <Icon as={icon} boxSize={5} color={iconColor} />}
          <Text
            fontSize={'sm'}
            fontFamily={'inter'}
            fontWeight={600}
            color={useColorModeValue('#004F86', 'white')}
            letterSpacing={1}
          >
            {title}
          </Text>
        </HStack>
        <HStack spacing={2}>
          {/* Fullscreen Icon */}
          {fullScreen && (
            <IconButton
              aria-label="Fullscreen"
              icon={<MdFullscreen />}
              onClick={handleFullScreen}
              boxSize={5}
              variant="ghost"
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
          {/* Time Window Icon */}
          {timeWindow && (
            <IconButton
              aria-label="Time Window"
              icon={<RxCounterClockwiseClock />}
              onClick={onOpen}
              variant="ghost"
              _hover={{ bg: 'transparent', color: 'gray.500' }}
            />
          )}
        </HStack>
      </Flex>

      {/* Use Portal to render the modal within the fullscreen container */}
      <Portal containerRef={chartLayoutRef}>
        <TimeWindow
          isOpen={isOpen}
          onClose={onClose}
          onReset={onReset || (() => {})}
          onSave={onTimeWindowChange || (() => {})}
        />
      </Portal>

      <Box
        as="main"
        pb={6}
        height={'full'}
        width={'full'}
        mt={mt}
        _dark={{ color: 'white' }}
        overflow={overflow}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ChartLayout;
