
// Time Setting Options
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

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
        default:
            return 5 * minute;
    }
};

interface timeWindow {
    startTs : number;
    endTs : number;
    aggregate : string;
}

export const useTimeHandle = () => {
    
    const initTimeSetter = (count : number, interval : string, aggregate : string) : timeWindow  => {
        const endTs = Date.now(); // Current time
        const startTs = endTs - timeOption(count, interval); // Calculate start time
        return { startTs : startTs, endTs : endTs, aggregate: aggregate };
    }

    const histTimeSetter = (startTs : number, endTs : number, aggregate: string) : timeWindow => {
        return { startTs : startTs, endTs : endTs, aggregate: aggregate };
    }

    return {initTimeSetter, histTimeSetter}
};

