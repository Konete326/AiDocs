import axios from 'axios';
import { toast } from 'react-hot-toast';

let _accessToken = null;
let refreshPromise = null;
let initialRefreshAttempted = false;
let initialRefreshFailed = false;

export const getAccessToken = () => _accessToken;
export const setAccessToken = (token) => {
  _accessToken = token;
  if (token) {
    initialRefreshFailed = false;
    initialRefreshAttempted = true;
  }
};

const rawBaseUrl = import.meta.env.VITE_API_URL || '/api';
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, '');

const api = axios.create({
  baseURL: cleanBaseUrl,
  withCredentials: true,
});

const isPublicAuthEndpoint = (url) => {
  if (!url) return false;
  return url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh') ||
    url.includes('/auth/google') ||
    url.includes('/auth/logout') ||
    url.includes('/auth/forgot-password') ||
    url.includes('/auth/reset-password');
};

export const refreshAccessTokenSilent = async () => {
  if (!refreshPromise) {
    const storedRefreshToken = localStorage.getItem('clarifyai_refresh_token');
    const headers = {};
    if (storedRefreshToken) {
      headers['X-Refresh-Token'] = storedRefreshToken;
    }

    refreshPromise = axios.post(
      `${cleanBaseUrl}/auth/refresh`,
      {},
      { withCredentials: true, headers }
    ).then(response => {
      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.refreshToken;
      setAccessToken(newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('clarifyai_refresh_token', newRefreshToken);
      }
      return newAccessToken;
    }).catch(err => {
      setAccessToken(null);
      localStorage.removeItem('clarifyai_refresh_token');
      initialRefreshFailed = true;
      throw err;
    }).finally(() => {
      refreshPromise = null;
      initialRefreshAttempted = true;
    });
  }
  return refreshPromise;
};

api.interceptors.request.use(
  async (config) => {
    if (isPublicAuthEndpoint(config.url)) {
      return config;
    }

    if (refreshPromise) {
      try {
        await refreshPromise;
      } catch (err) {
        // Handled by response interceptor
      }
    } else if (!_accessToken && !initialRefreshFailed) {
      try {
        await refreshAccessTokenSilent();
      } catch (err) {
        // Handled by response interceptor
      }
    }

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
    const isRefreshRequest = originalRequest && originalRequest.url && originalRequest.url.includes('/auth/refresh');

    if (error.response && error.response.data && error.response.data.error === 'Database connection failed') {
      toast.error('Database connection failed');
    }

    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessTokenSilent();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        try {
          await axios.post(`${cleanBaseUrl}/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
        } finally {
          setAccessToken(null);
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;


