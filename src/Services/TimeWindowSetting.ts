import { useState, useEffect } from 'react';

// Time Setting Options
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const quarter = 3 * month;

const timeOption = (count: number, interval: string) => {
    switch (interval) {
        case "seconds":
            return count * second;
        case "minute":
            return count * minute;
        case "hour":
            return count * hour;
        case "day":
            return count * day;
        case "week":
            return count * week;
        case "month":
            return count * month;
        case "quarter":
            return count * quarter;
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
