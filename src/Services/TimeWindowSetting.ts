
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

interface timeWindow {
    startTs : number;
    endTs : number;
    aggregate : string;
    interval : number;
}

export const useTimeHandle = () => {
    
    const initTimeSetter = (count : number, intervalMS : string, aggregate : string, groupInterval: [number, string]) : timeWindow  => {
        const endTs = Date.now(); // Current time
        const startTs = endTs - timeOption(count, intervalMS); // Calculate start time
        const interval = timeOption(groupInterval[0], groupInterval[1])
        return { startTs : startTs, endTs : endTs, aggregate: aggregate, interval : interval};
    }

    const histTimeSetter = (startTs : number, endTs : number, aggregate: string, interval: number) : timeWindow => {
        return { startTs : startTs, endTs : endTs, aggregate: aggregate, interval: interval };
    }

    return {initTimeSetter, histTimeSetter}
};

