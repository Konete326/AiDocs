import axios from 'axios';

// Token is memory-only — never stored in localStorage (XSS mitigation)
let _accessToken = null;
let refreshPromise = null;

export const getAccessToken = () => _accessToken;
export const setAccessToken = (token) => { _accessToken = token; };

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const refreshAccessTokenSilent = async () => {
  if (!refreshPromise) {
    refreshPromise = axios.post(
      `${api.defaults.baseURL}/auth/refresh`,
      {},
      { withCredentials: true }
    ).then(response => {
      const newAccessToken = response.data.data.accessToken;
      setAccessToken(newAccessToken);
      return newAccessToken;
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
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest.url && originalRequest.url.includes('/auth/refresh');

    if (error.response?.status === 401 && !originalRequest._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessTokenSilent();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        // Let AuthContext and PrivateRoute handle redirection
        return Promise.reject(refreshError);
      }
    }

    // Let AuthContext handle the rejection natively to prevent redirect loops
    return Promise.reject(error);
  }
);

export default api;
