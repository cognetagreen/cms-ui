import { useState, useEffect, useCallback, useRef } from 'react';
import ColumnLineAPI from '../../api/ColumnLineAPI';

const UseColumnLine = (textSearch: string, type: Object) => {
    const [data, setData] = useState(null);
    const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {
        try {
            const response = await ColumnLineAPI(textSearch, type);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [textSearch, type]);

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

export default UseColumnLine;
