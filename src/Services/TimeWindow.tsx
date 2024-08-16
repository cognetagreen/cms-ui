import {
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
    onSave: (from: string, to: string, aggregation: string) => void;
}

export const TimeWindow: React.FC<TimeWindowProps> = ({ isOpen, onClose, onSave }) => {
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

    useEffect(() => {
        // Set default time range for the last 5 minutes
        const currentTime = new Date();
        const now = new Date(currentTime.getTime() - (currentTime.getTimezoneOffset() * 60000));
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        // Format the time as required by the <Input type="datetime-local" />
        const formatDate = (date: Date) => {
            console.log(date.toISOString())
            return date.toISOString().slice(0, 16);
        };

        setFromTime(formatDate(fiveMinutesAgo));
        setToTime(formatDate(now));
    }, []);

    const handleSave = () => {
        onSave(fromTime, toTime, aggregation);
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
                            <option value="NONE">NONE</option>
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
