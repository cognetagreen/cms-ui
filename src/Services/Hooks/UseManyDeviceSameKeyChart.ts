import { useState, useEffect, useCallback, useRef } from 'react';
import ManyDeviceSameKeyChartAPI from '../../api/ManyDeviceSameKeyChartAPI';

const UseManyDeviceSameKeyChart = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string, interval: number }) => {
    const [data, setData] = useState<Object[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await ManyDeviceSameKeyChartAPI(searchTag, timeWindow);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow]);

    useEffect(() => {
        
        fetchTelemetryData();

    }, [fetchTelemetryData]);

    return data;
};

export default UseManyDeviceSameKeyChart;
