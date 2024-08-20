import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface TimeWindowProps {
    isOpen: boolean;
    onClose: () => void;
    // firstInterval : [number, string];
    // onFirstInit : (startTs: number, endTs: number, aggregate: string) => void;
    onSave: (from: string, to: string, aggregation: string, interval : number) => void;
    onReset : (reset : boolean) => void;
}

// Time Setting Options
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const quarter = 3 * month;

export const TimeWindow: React.FC<TimeWindowProps> = ({ isOpen, onClose, onSave, onReset }) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const [overlay] = useState(<OverlayOne />);

    const [fromTime, setFromTime] = useState<string>("");
    const [toTime, setToTime] = useState<string>("");
    const [aggregation, setAggregation] = useState<string>("NONE");
    const [interval, setInterval] = useState<number>(5*minute);

    // Call the custom hook directly in the component body
    // const realTimeInterval = useInitTimeHandle(firstInterval[0], firstInterval[1]);

    // useEffect(() => {
        // const { startTs, endTs } = realTimeInterval;
        // onFirstInit(startTs, endTs, aggregation);
    //     const formatDate = (date: number) => {
    //         return new Date(date).toISOString().slice(0, 16);
    //     };

    //     setFromTime(formatDate(startTs));
    //     setToTime(formatDate(endTs));
    // }, [realTimeInterval]);
    
    

    const handleSave = () => {
        onSave(fromTime, toTime, aggregation, interval);
        onClose();
    };

    const handleReset = () => {
        onReset(true)
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} blockScrollOnMount={true}>
            {overlay}
            <ModalContent>
                <ModalHeader>Time Window</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired mb={2}>
                        <FormLabel>From</FormLabel>
                        <Input
                            type="datetime-local"
                            value={fromTime}
                            onChange={(e) => setFromTime(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>To</FormLabel>
                        <Input
                            type="datetime-local"
                            value={toTime}
                            onChange={(e) => setToTime(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Aggregate</FormLabel>
                        <Select
                            value={aggregation}
                            onChange={(e) => setAggregation(e.target.value)}
                        >
                            <option value="Min">Min</option>
                            <option value="Max">Max</option>
                            <option value="SUM">SUM</option>
                            <option value="AVG">AVG</option>
                            {/* <option value="COUNT">COUNT</option> */}
                            <option value="NONE">NONE</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired mb={2}>
                        <FormLabel>Interval</FormLabel>
                        <Select
                            py={3}
                            value={interval}
                            onChange={(e) => setInterval(parseInt(e.target.value))}
                        >
                            <option value={5*minute}>5 Minute</option>
                            <option value={10*minute}>10 Minute</option>
                            <option value={15*minute}>15 Minute</option>
                            <option value={30*minute}>30 Minute</option>
                            <option value={hour}>1 Hour</option>
                            <option value={2*hour}>2 Hour</option>
                            <option value={5*hour}>5 Hour</option>
                            <option value={10*hour}>10 Hour</option>
                            <option value={12*hour}>12 Hour</option>
                            <option value={day}>1 day</option>
                            <option value={week}>Week</option>
                            <option value={month}>Month (30 days)</option>
                            <option value={quarter}>Quarter</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter display={"flex"} justifyContent={"space-between"}>
                    <Button colorScheme="red" mr={3} onClick={handleReset}>
                        Reset
                    </Button>
                    <Box>
                        <Button colorScheme="blue" mr={3} onClick={handleSave}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
