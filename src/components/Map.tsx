import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Cafe } from '../types';

interface MapProps {
  cafes: Cafe[];
}

const Map: React.FC<MapProps> = ({ cafes }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly"
      });

      const google = await loader.load();
      
      if (mapRef.current && cafes.length > 0) {
        const center = { lat: cafes[0].location.lat, lng: cafes[0].location.lng };
        
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 13,
        });

        googleMapRef.current = map;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // Add markers for each cafe
        cafes.forEach(cafe => {
          const marker = new google.maps.Marker({
            position: { lat: cafe.location.lat, lng: cafe.location.lng },
            map,
            title: cafe.name,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <h3 class="font-semibold">${cafe.name}</h3>
                <p>${cafe.rating} ★</p>
                <p>${cafe.location.address}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          markersRef.current.push(marker);
        });
      }
    };

    initMap();
  }, [cafes]);

  return <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-md" />;
};

export default Map;