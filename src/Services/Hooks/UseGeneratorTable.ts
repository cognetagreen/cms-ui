import { useState, useEffect, useCallback, useRef } from 'react';
import GeneratorTableAPI from '../../api/GeneratorTableAPI';
interface APIData {
    column : string[];
    dataFromAPI : string[][]; 
  }

const UseGeneratorTable = (searchTag: Object, timeWindow: { startTs: number, endTs: number, aggregate: string }) => {
    const [data, setData] = useState<APIData[] | null>(null);

    const fetchTelemetryData = useCallback(async () => {

        try {
            const response = await GeneratorTableAPI(searchTag, timeWindow);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [timeWindow]);

    useEffect(() => {
        
        fetchTelemetryData();
        
        // const interval = setInterval(fetchTelemetryData, 300000); // 5-minute interval
        // return () => clearInterval(interval);
    }, [fetchTelemetryData]);

    return data;
};

export default UseGeneratorTable;
