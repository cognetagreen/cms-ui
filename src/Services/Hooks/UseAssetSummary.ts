import { useState, useEffect, useCallback, useRef } from 'react';
import AssetSummaryAPI from '../../api/AssetSummaryAPI';

const UseAssetSummary = (searchObj: Object) => {
    const [data, setData] = useState(null);
    const hasFetchedRef = useRef(false);

    const fetchTelemetryData = useCallback(async () => {
        try {
            const response = await AssetSummaryAPI(searchObj);
            setData(response?.data);
        } catch (error) {
            console.error('Error fetching telemetry data:', error);
        }
    }, [searchObj]);

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

export default UseAssetSummary;
