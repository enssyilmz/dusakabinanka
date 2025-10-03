'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface MapComponentProps {
  className?: string;
}

export default function MapComponent({ className = "" }: MapComponentProps) {
  // Ordu, Altınordu koordinatları (yaklaşık)
  const position: [number, number] = [40.9833, 37.8833];
  const address = "Şahincili, Polatlı Şehitleri Cd. No:17/A, 52800 Altınordu/Ordu";

  useEffect(() => {
    // Leaflet icon fix for Next.js
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        // Fix for default markers in Next.js
        const DefaultIcon = L.icon({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        L.Marker.prototype.options.icon = DefaultIcon;
      });
    }
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Anka Duşakabin</h3>
              <p className="text-sm">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
