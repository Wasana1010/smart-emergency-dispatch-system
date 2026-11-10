import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icons failing to load in Vite/React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.parseIcon = DefaultIcon;

export default function EmergencyMap({ 
    center = [6.9271, 79.8612], // Default center (e.g., Colombo, Sri Lanka)
    zoom = 13, 
    emergencyLocation, 
    ambulanceLocation, 
    hospitalLocation, 
    routeCoordinates = [], // Array of [lat, lon] points from backend Dijkstra result
    blockedRoads = []      // Array of [{start: [lat,lon], end: [lat,lon]}]
}) {
    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '450px', width: '100%', borderRadius: '8px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Emergency Incident Marker */}
            {emergencyLocation && (
                <Marker position={[emergencyLocation.lat, emergencyLocation.lon]}>
                    <Popup><strong>Emergency Location</strong><br/>Incident reported here.</Popup>
                </Marker>
            )}

            {/* Ambulance Marker */}
            {ambulanceLocation && (
                <Marker position={[ambulanceLocation.lat, ambulanceLocation.lon]}>
                    <Popup><strong>Assigned Ambulance</strong><br/>Unit: {ambulanceLocation.number}</Popup>
                </Marker>
            )}

            {/* Hospital Marker */}
            {hospitalLocation && (
                <Marker position={[hospitalLocation.lat, hospitalLocation.lon]}>
                    <Popup><strong>Selected Hospital</strong><br/>{hospitalLocation.name}</Popup>
                </Marker>
            )}

            {/* Optimized Route Polyline (Calculated by Java Backend Dijkstra) */}
            {routeCoordinates.length > 0 && (
                <Polyline positions={routeCoordinates} color="blue" weight={5} opacity={0.7} />
            )}

            {/* Blocked Road Segments */}
            {blockedRoads.map((road, index) => (
                <Polyline 
                    key={`blocked-${index}`} 
                    positions={[road.start, road.end]} 
                    color="red" 
                    dashArray="5, 10" 
                    weight={4} 
                >
                    <Popup><strong>Road Blocked</strong><br/>{road.reason || 'Active blockage'}</Popup>
                </Polyline>
            ))}
        </MapContainer>
    );
}