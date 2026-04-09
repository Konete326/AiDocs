import api, { setAccessToken } from './api';
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
  const { user: firebaseUser } = result;
  const idToken = await firebaseUser.getIdToken();
  const response = await api.post('/auth/google', { idToken });
  setAccessToken(response.data.data.accessToken);
  return response.data.data.user;
}

export async function logoutUser() {
  await api.post('/auth/logout');
  setAccessToken(null);
}

export async function refreshAccessToken() {
  const response = await api.post('/auth/refresh');
  setAccessToken(response.data.data.accessToken);
  return response.data.data.accessToken;
}
