import { useState, useEffect, useCallback, useRef } from 'react';
import PlantTableSummaryAPI from '../../api/PlantTableSummaryAPI';


const UsePlantTableSummary = (searchTag : Object, textSearch : string[]) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);
  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await PlantTableSummaryAPI(searchTag, textSearch);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [searchTag, textSearch]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
        fetchTelemetryData();
        hasFetchedRef.current = true;
    }
    const interval = setInterval(fetchTelemetryData, 300000);
    return () => clearInterval(interval);
  }, [fetchTelemetryData]);

  return data;
};

export default UsePlantTableSummary;
