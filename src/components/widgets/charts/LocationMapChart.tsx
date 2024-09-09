import React from 'react';
import { MapContainer, TileLayer, Circle, Popup, MapContainerProps, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet's default icon issue with Webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapChartProps {
  lat: string;
  long: string;
}

const LocationMapChart: React.FC<LocationMapChartProps> = ({ lat, long, ...props }) => {
  var lats = Number(lat);
  var longs = Number(long);

  return (
    <MapContainer
      center={[lats, longs]}
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={[lats, longs]} radius={200}>
        <Popup >
          <div>
            <b>
              <h1>PV Power</h1>
              <span>Power : 302 kW</span><br />
              <span>Daily Energy : 1340 kWh</span>
            </b>
          </div>
        </Popup>
      </Circle>
      <Circle center={[12.5545, 77.8989]} radius={200}>
        <Popup >
          <div>
            <b>
              <h1>Hybrid Power</h1>
              <span>Power : 302 kW</span><br />
              <span>Daily Energy : 1340 kWh</span>
            </b>
          </div>
        </Popup>
      </Circle>
      {/* ... other map elements */}
    </MapContainer>
  );
};

export default LocationMapChart;
