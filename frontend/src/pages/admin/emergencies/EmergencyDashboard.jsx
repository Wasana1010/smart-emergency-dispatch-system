import React, { useEffect, useState } from 'react';
import { emergencyService } from '../../../services/emergencyService';

export default function EmergencyDashboard() {
    const [emergencies, setEmergencies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmergencies();
    }, []);

    const loadEmergencies = async () => {
        try {
            const data = await emergencyService.getAllEmergencies();
            setEmergencies(data);
        } catch (error) {
            console.error("Failed to fetch emergencies from backend", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading real-time emergencies...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Active Emergency Incidents</h2>
            <ul>
                {emergencies.map((emg) => (
                    <li key={emg.id}>
                        {emg.requestNumber} - [{emg.priority}] {emg.emergencyType} ({emg.status})
                    </li>
                ))}
            </ul>
        </div>
    );
}