import axios from 'axios';
import { toast } from 'react-hot-toast';

let _accessToken = null;
let refreshPromise = null;

export const getAccessToken = () => _accessToken;
export const setAccessToken = (token) => { _accessToken = token; };

const rawBaseUrl = import.meta.env.VITE_API_URL || '/api';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: cleanBaseUrl,
  withCredentials: true,
});

export const refreshAccessTokenSilent = async () => {
  if (!refreshPromise) {
    refreshPromise = axios.post(
      `${cleanBaseUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    ).then(response => {
      const newAccessToken = response.data.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
    }).catch(err => {
      setAccessToken(null);
      throw err;
    }).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.url && config.url.includes('//')) {
      config.url = config.url.replace(/([^:]\/)\/+/g, '$1');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest.url && originalRequest.url.includes('/auth/refresh');

    if (error.response && error.response.data && error.response.data.error === 'Database connection failed') {
      toast.error('Database connection failed');
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessTokenSilent();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        axios.post(`${cleanBaseUrl}/auth/logout`, {}, { withCredentials: true }).catch(() => {});
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

