import api from './api';

export const ambulanceService = {
    // POST /api/ambulances - Registers a new ambulance into the fleet
    createAmbulance: async (ambulanceData) => {
        const response = await api.post('/ambulances', ambulanceData);
        return response.data;
    },
};