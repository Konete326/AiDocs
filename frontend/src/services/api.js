import axios from 'axios';

// Always use /api - Vite proxy handles it in dev, Vercel handles it in prod
const baseURL = '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let memoryToken = null;

export const setApiToken = (token) => {
  memoryToken = token;
};

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (memoryToken) {
    config.headers.Authorization = `Bearer ${memoryToken}`;
  }
  return config;
});

export default api;
