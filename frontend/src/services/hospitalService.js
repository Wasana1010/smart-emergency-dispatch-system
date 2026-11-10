import api from './api';

export const hospitalService = {
    // POST /api/hospitals - Registers a new hospital facility and its bed capacities
    createHospital: async (hospitalData) => {
        const response = await api.post('/hospitals', hospitalData);
        return response.data;
    },
};