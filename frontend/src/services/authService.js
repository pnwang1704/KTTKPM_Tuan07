import { authClient } from './apiClient';

export const authService = {
  login: async (credentials) => {
    // We'll simulate login for now as we only implemented /register in backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 1, name: credentials.email.split('@')[0], token: 'mock-jwt-token' });
      }, 1000);
    });
  },
  
  register: async (userData) => {
    // API: POST /auth/register
    return authClient.post('/auth/register', userData);
  }
};
