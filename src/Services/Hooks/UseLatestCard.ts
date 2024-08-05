import { useState, useEffect, useCallback } from 'react';
import LatestValueCardAPI from '../../api/LatestValueCardAPI';


const UseLatestCard = (deviceLabel : string, telemetry : string, title : string) => {
  const [data, setData] = useState(null);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await LatestValueCardAPI(deviceLabel, telemetry, title);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [deviceLabel, telemetry]);

  useEffect(() => {
    fetchTelemetryData();
    const interval = setInterval(fetchTelemetryData, 300000);
    return () => clearInterval(interval);
  }, [fetchTelemetryData]);

  return data;
};

export default UseLatestCard;
