import { useState, useEffect } from 'react';

// Time Setting Options
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const quarter = 3 * month;
const cdsf = new Date().getTime() - new Date().setHours(0, 0, 0, 0);

const timeOption = (count: number, interval: string) => {
    switch (interval) {
        case "seconds":
            return count * second;      // This is Last Day
        case "minute":
            return count * minute;      // This is Last Day
        case "hour":
            return count * hour;        // This is Last Day
        case "day":
            return count * day;         // This is Last Day
        case "week":
            return count * week;        // This is Last Day
        case "month":
            return count * month;       // This is Last Day
        case "quarter":
            return count * quarter;     // This is Last Day
            case "cdsf":
                return cdsf;
        default:
            return 5 * minute;
    }
};

interface TimeWindow {
    startTs: number;
    endTs: number;
    aggregate: string;
    interval: number;
}

export const useTimeHandle = (
    defaultCount: number, 
    defaultInterval: string, 
    defaultAggregate: string, 
    defaultGroupInterval: [number, string], 
    autoUpdateIntervalMs: number = 300000 // 5 minutes by default
) => {
    const initTimeSetter = (
        count: number, 
        intervalMS: string, 
        aggregate: string, 
        groupInterval: [number, string]
    ): TimeWindow => {
        const endTs = Date.now(); // Current time
        const startTs = endTs - timeOption(count, intervalMS); // Calculate start time
        const interval = timeOption(groupInterval[0], groupInterval[1]);
        return { startTs, endTs, aggregate, interval };
    };
    const [manualChanges, setManualChanges] = useState<boolean>(true);
    const [timeWindow, setTimeWindow] = useState<TimeWindow>(() =>
        initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval)
    );


    const handleTimeWindowChange = (from: string, to: string, aggregate: string, interval: number) => {
        const startTs = new Date(from).getTime();
        const endTs = new Date(to).getTime();
        setManualChanges(false);
        setTimeWindow({ startTs, endTs, aggregate, interval });
    };

    const handleReset = () => {
        setManualChanges(true);
        setTimeWindow(initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval));
    };

    useEffect(() => {
        if (manualChanges) {
            const intervalId = setInterval(() => {
                setTimeWindow(initTimeSetter(defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval));
            }, autoUpdateIntervalMs);

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [manualChanges, defaultCount, defaultInterval, defaultAggregate, defaultGroupInterval, autoUpdateIntervalMs]);

    return {
        timeWindow,
        handleTimeWindowChange,
        handleReset,
    };
};
