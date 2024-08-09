import { useState, useEffect, useCallback, useRef } from 'react';
import EnergyYieldAPI from '../../api/EnergyYieldAPI';

const UseEnergyYield = (textSearch: string, key: string) => {
    const [data, setData] = useState(null);
    const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {
        try {
            const response = await EnergyYieldAPI(textSearch, key);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [textSearch, key]);

    useEffect(() => {
        if (!hasFetchedRef.current) {
            fetchTelemetryData();
            hasFetchedRef.current = true;
        }
        
        const interval = setInterval(fetchTelemetryData, 300000); // 5 minutes interval
        return () => clearInterval(interval);
    }, [fetchTelemetryData]);

    return data;
};

export default UseEnergyYield;
