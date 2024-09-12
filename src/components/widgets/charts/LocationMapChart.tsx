import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box } from '@chakra-ui/react';

// Fix leaflet's default icon issue with Webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface dataType {
  country: string;
  lat: number;
  long: number;
  name: string;
  type: string;
}

interface LocationMapChartProps {
  apiData: dataType[];
}

// Component to change the map center dynamically
const ChangeMapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const LocationMapChart: React.FC<LocationMapChartProps> = ({ apiData }) => {
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const dotColor = ["#0086CC", "#F8931F", "#704199"]; //"#7EC800"

  const handleColor = (type : string) : string =>  {
    console.log(9, type)
    switch (type) {
      case "PV":
        return dotColor[0];
        break;
      case "Wind":
        return dotColor[1];
        break;
      case "Hybrid":
        return dotColor[2];
        break;
      default:
        return dotColor[2];
        break;
    }
  };

  // Calculate the geographic center of all locations
  const calculateCenter = (data: dataType[]): [number, number] => {
    if (data.length === 0) return [0, 0]; // Default center if there's no data
    const totalLat = data.reduce((sum, loc) => sum + loc.lat, 0);
    const totalLong = data.reduce((sum, loc) => sum + loc.long, 0);
    return [totalLat / data.length, totalLong / data.length]; // Calculate average latitude and longitude
  };

  useEffect(() => {
    setCenter(calculateCenter(apiData));
  }, [apiData]);

  // useEffect(() => {
  //   // Select all popups and apply the background color
  //   const popups = document.getElementsByClassName('leaflet-popup-content-wrapper');
  //   Array.from(popups).forEach((popup) => {
  //     (popup as HTMLElement).style.backgroundColor = 'black'; // Example background color
  //   });
  // }, [apiData]);


  return (
    <MapContainer
      center={center} // Use calculated center
      zoom={3}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      {/* Change map center dynamically */}
      <ChangeMapCenter center={center} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {apiData.map((value: dataType, i: number) => (
        <Circle key={i} center={[value.lat, value.long]} color={handleColor(value.type)} radius={50}>
            <Popup>
              <Box bg={handleColor(value.type)} m={0} p={0}>
                <b>
                  <h1>{value.name}</h1>
                  <span>Type: {value.type}</span>
                  <br />
                  <span>Country: {value.country}</span>
                </b>
              </Box>
            </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default LocationMapChart;
