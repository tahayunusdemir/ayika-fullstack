import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression, latLngBounds, divIcon } from 'leaflet';
import { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import LocationOn from '@mui/icons-material/LocationOn';
import { Link, Typography, Box } from '@mui/material';

interface City {
  name: string;
  lat: number;
  lon: number;
}

const customMarkerIcon = divIcon({
  html: renderToStaticMarkup(
    <LocationOn sx={{ color: 'red', fontSize: '32px' }} />
  ),
  className: 'dummy-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const FitBoundsToMarkers = ({ cities }: { cities: City[] }) => {
  const map = useMap();

  useEffect(() => {
    if (cities && cities.length > 0) {
      const bounds = latLngBounds(cities.map((city) => [city.lat, city.lon]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [cities, map]);

  return null;
};

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const TurkeyMap = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetch('/iller.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedCities = data.map(
          (city: { name: string; latitude: string; longitude: string }) => ({
            name: city.name,
            lat: parseFloat(city.latitude),
            lon: parseFloat(city.longitude),
          }),
        );
        setCities(transformedCities);
      })
      .catch((error) => console.error('Error fetching city data:', error));
  }, []);

  const turkeyCenter: LatLngExpression = [39.9334, 32.8667];

  return (
    <MapContainer
      center={turkeyCenter}
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lon]}
          icon={customMarkerIcon}
        >
          <Popup>
            <Box>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {city.name}
              </Typography>
              <Link
                href={`https://www.google.com/maps/dir/?api=1&destination=${city.lat},${city.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Yol Tarifi Al
              </Link>
            </Box>
          </Popup>
        </Marker>
      ))}
      <MapResizer />
      <FitBoundsToMarkers cities={cities} />
    </MapContainer>
  );
};

export default TurkeyMap; 