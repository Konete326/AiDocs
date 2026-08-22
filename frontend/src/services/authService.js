import api, { setAccessToken, refreshAccessTokenSilent } from './api';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

export async function registerUser(name, email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const response = await api.post('/auth/register', { displayName: name, email: cleanEmail, password });
  setAccessToken(response.data.data.accessToken);
  if (response.data.data.refreshToken) {
    localStorage.setItem('clarifyai_refresh_token', response.data.data.refreshToken);
  }
  return response.data.data.user;
}

export async function loginUser(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const response = await api.post('/auth/login', { email: cleanEmail, password });
  setAccessToken(response.data.data.accessToken);
  if (response.data.data.refreshToken) {
    localStorage.setItem('clarifyai_refresh_token', response.data.data.refreshToken);
  }
  return response.data.data.user;
}

export async function loginWithGoogle() {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please configure VITE_FIREBASE_API_KEY in .env file.');
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();
    const response = await api.post('/auth/google', { idToken });
    setAccessToken(response.data.data.accessToken);
    if (response.data.data.refreshToken) {
      localStorage.setItem('clarifyai_refresh_token', response.data.data.refreshToken);
    }
    return response.data.data.user;
  } catch (err) {
    if (err.code === 'auth/unauthorized-domain') {
      throw new Error('Domain (testclarifyai.vercel.app) is not authorized in Firebase Console -> Authentication -> Settings -> Authorized Domains.');
    }
    throw err;
  }
}

export async function logoutUser() {
  try {
    await api.post('/auth/logout');
  } catch (err) {
  } finally {
    setAccessToken(null);
    localStorage.removeItem('clarifyai_refresh_token');
  }
}

export async function refreshAccessToken() {
  return await refreshAccessTokenSilent();
}

export async function forgotPasswordApi(email) {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
}

export async function resetPasswordApi(token, password) {
  const { data } = await api.post('/auth/reset-password', { token, password });
  return data;
}
