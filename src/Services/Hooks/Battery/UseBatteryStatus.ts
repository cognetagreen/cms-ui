import { useState, useEffect, useCallback, useRef } from 'react';
import BatteryStatusAPI from '../../../api/Battery/BatteryStatusAPI';


const UseBatteryStatus = ( searchKeys : Object) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await BatteryStatusAPI(searchKeys);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [searchKeys]);

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

export default UseBatteryStatus;
