import api from './api';

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);

        if (response.data.token) {
            localStorage.setItem('jwt_token', response.data.token);
            localStorage.setItem('user_role', response.data.role);
        }

        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_role');
    },

    getCurrentRole: () => {
        return localStorage.getItem('user_role');
    }
};