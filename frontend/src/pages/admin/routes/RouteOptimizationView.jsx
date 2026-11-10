import React, { useState, useEffect } from 'react';
import EmergencyMap from "../../../components/map/EmergencyMap";
import { routeService } from "../../../services/routeService";

export function RouteOptimizationView() {
    const [routeCoords, setRouteCoords] = useState([]);

    const fetchRoute = async (startNodeId, targetNodeId) => {
        try {
            const result = await routeService.calculateRoute(startNodeId, targetNodeId);
        } catch (error) {
            console.error("Error loading route visualization", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Emergency Navigation & Route Visualization</h2>
            <EmergencyMap 
                emergencyLocation={{ lat: 6.9271, lon: 79.8612 }}
                ambulanceLocation={{ lat: 6.9100, lon: 79.8500, number: 'AMB-01' }}
                hospitalLocation={{ lat: 6.9350, lon: 79.8800, name: 'National Hospital' }}
                routeCoordinates={routeCoords}
            />
        </div>
    );
}

// Add this default export alias so App.jsx works either way
export default RouteOptimizationView;