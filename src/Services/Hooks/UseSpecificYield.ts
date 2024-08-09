import { useState, useEffect, useCallback } from 'react';
import SpecificYieldAPI from '../../api/SpecificYieldAPI';


const UseSpecificYield = (textSearch : string, key : string) => {
  const [data, setData] = useState(null);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await SpecificYieldAPI(textSearch, key);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [textSearch, key]);

  useEffect(() => {
    fetchTelemetryData();
    const interval = setInterval(fetchTelemetryData, 300000);
    return () => clearInterval(interval);
  }, [fetchTelemetryData]);

  return data;
};

export default UseSpecificYield;
