import { useState, useEffect, useCallback, useRef } from 'react';
import CellVDeltaAPI from '../../../api/Battery/CellVDeltaAPI';


const UseCellVDelta = ( searchKeys : Object) => {
  const [data, setData] = useState(null);
  const hasFetchedRef = useRef(false);

  const fetchTelemetryData = useCallback(async () => {
    try {
      const response = await CellVDeltaAPI(searchKeys);
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
  }, [fetchTelemetryData]);

  return data;
};

export default UseCellVDelta;
