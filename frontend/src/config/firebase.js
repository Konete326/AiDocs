import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

let authInstance = null;
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined') {
  try {
    const app = initializeApp(firebaseConfig);
    authInstance = getAuth(app);
  } catch (err) {
    console.warn('Firebase initialization skipped:', err.message);
  }
}

export const auth = authInstance;
export const googleProvider = new GoogleAuthProvider();

