import { useState, useEffect, useCallback, useRef } from 'react';
import PlantViewTableAPI from '../../../api/PlantView/PlantViewTableAPI';


const UsePlanViewTable = (searchTag : Object) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);


  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await PlantViewTableAPI(searchTag);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [searchTag]);

  useEffect(() => {
    if(!hasFetchedRef.current) {
        fetchTelemetryData();
        hasFetchedRef.current = true;
      }
    const interval = setInterval(fetchTelemetryData, 300000);
    return () => clearInterval(interval);
  }, [fetchTelemetryData]);

  return data;
};

export default UsePlanViewTable;
