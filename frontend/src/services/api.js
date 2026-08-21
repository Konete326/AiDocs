import axios from 'axios';
import { toast } from 'react-hot-toast';

let _accessToken = null;
let refreshPromise = null;
let initialRefreshAttempted = false;
let initialRefreshFailed = false;

const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 800;

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

const isNetworkOrServerError = (error) => {
  if (!error) return false;
  if (!error.response) return true;
  const status = error.response.status;
  return status === 408 || status === 429 || status === 502 || status === 503 || status === 504;
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
      { refreshToken: storedRefreshToken || undefined },
      { withCredentials: true, headers }
    ).then(response => {
      const newAccessToken = response.data?.data?.accessToken;
      const newRefreshToken = response.data?.data?.refreshToken;
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
    if (config.url && config.url.startsWith('/api/')) {
      config.url = config.url.substring(4);
    }

    if (isPublicAuthEndpoint(config.url)) {
      return config;
    }

    if (refreshPromise) {
      try {
        await refreshPromise;
      } catch (err) {}
    } else if (!_accessToken && !initialRefreshFailed) {
      try {
        await refreshAccessTokenSilent();
      } catch (err) {}
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
          localStorage.removeItem('clarifyai_refresh_token');
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
            window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
          }
        }
        return Promise.reject(refreshError);
      }
    }

    if (originalRequest && !isRefreshRequest && isNetworkOrServerError(error)) {
      originalRequest.__retryCount = originalRequest.__retryCount || 0;
      if (originalRequest.__retryCount < MAX_RETRIES) {
        originalRequest.__retryCount += 1;
        const delay = RETRY_DELAY_BASE * Math.pow(1.5, originalRequest.__retryCount - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
