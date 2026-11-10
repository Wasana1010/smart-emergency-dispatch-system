import api from './api';

export const emergencyService = {
    // POST /api/emergencies - Creates a new emergency incident report
    createEmergency: async (emergencyData) => {
        const response = await api.post('/emergencies', emergencyData);
        return response.data;
    },

    // Compatibility alias used by the emergency form component
    createEmergencyRequest: async (emergencyData) => {
        return emergencyService.createEmergency(emergencyData);
    },

    // GET /api/emergencies - Retrieves all recorded emergency incidents
    getAllEmergencies: async () => {
        const response = await api.get('/emergencies');
        return response.data;
    },

    // GET /api/emergencies/{id} - Fetches detailed information for a specific emergency
    getEmergencyById: async (id) => {
        const response = await api.get(`/emergencies/${id}`);
        return response.data;
    },

    // PATCH /api/emergencies/{id}/status - Updates the operational status of an emergency
    updateStatus: async (id, status) => {
        const response = await api.patch(`/emergencies/${id}/status?status=${status}`);
        return response.data;
    },

    // PATCH /api/emergencies/{id}/cancel - Cancels an active emergency request
    cancelEmergency: async (id) => {
        const response = await api.patch(`/emergencies/${id}/cancel`);
        return response.data;
    },

    // GET /api/emergencies/priority-queue - Retrieves active emergencies sorted by algorithmic priority
    getPriorityQueue: async () => {
        const response = await api.get('/emergencies/priority-queue');
        return response.data;
    },
};