import api from './api';

export const routeService = {
    // Calculates shortest route via backend Dijkstra engine
    calculateRoute: async (startNodeId, targetNodeId) => {
        const response = await api.get(`/roads/route?start=${startNodeId}&target=${targetNodeId}`);
        return response.data;
    },
    
    // Adds a weighted road segment into the spatial network
    addRoadEdge: async (edgeData) => {
        const response = await api.post('/roads/edges', edgeData);
        return response.data;
    },
};