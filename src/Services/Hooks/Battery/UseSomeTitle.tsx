import { useState, useEffect, useCallback, useRef } from 'react';
import SomeTitleAPI from '../../../api/Battery/SomeTitleAPI';


const UseSomeTitle = (searchTagSomeTitle : Object) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await SomeTitleAPI(searchTagSomeTitle);
      setData(response?.data);
    } catch (error) {
      console.error('Error fetching telemetry data:', error);
    }
  }, [searchTagSomeTitle]);

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

export default UseSomeTitle;
