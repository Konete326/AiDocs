import api, { setAccessToken, refreshAccessTokenSilent } from './api';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

export async function registerUser(name, email, password) {
  const response = await api.post('/auth/register', { displayName: name, email, password });
  setAccessToken(response.data.data.accessToken);
  return response.data.data.user;
}

export async function loginUser(email, password) {
  const response = await api.post('/auth/login', { email, password });
  setAccessToken(response.data.data.accessToken);
  return response.data.data.user;
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  const response = await api.post('/auth/google', { idToken });
  setAccessToken(response.data.data.accessToken);
  return response.data.data.user;
}

export async function logoutUser() {
  await api.post('/auth/logout');
  setAccessToken(null);
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
