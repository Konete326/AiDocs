import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
  loginWithGoogle as apiLoginGoogle,
  logoutUser as apiLogout,
  refreshAccessToken,
} from '../services/authService';
import { getMe } from '../services/userService';
import { authReducer, initialState } from './authReducer';

const defaultAuthContext = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  loginGoogle: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: () => {}
};

const AuthContext = createContext(defaultAuthContext);

const authChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('clarifyai_auth')
  : null;

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        await refreshAccessToken();
        const user = await getMe();
        if (isMounted) {
          dispatch({ type: 'SET_USER', payload: user });
        }
      } catch {
        if (isMounted) {
          dispatch({ type: 'CLEAR_USER' });
        }
      } finally {
        if (isMounted) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    }

    bootstrap();

    if (authChannel) {
      const handleMessage = async (e) => {
        if (e.data?.type === 'LOGOUT') {
          dispatch({ type: 'CLEAR_USER' });
        } else if (e.data?.type === 'LOGIN') {
          try {
            await refreshAccessToken();
            const user = await getMe();
            if (isMounted) dispatch({ type: 'SET_USER', payload: user });
          } catch {
            if (isMounted) dispatch({ type: 'CLEAR_USER' });
          }
        }
      };
      authChannel.addEventListener('message', handleMessage);
      return () => {
        isMounted = false;
        authChannel.removeEventListener('message', handleMessage);
      };
    }

    return () => { isMounted = false; };
  }, []);

  const login = async (email, password) => {
    const loginRes = await apiLogin(email, password);
    try {
      const fullUser = await getMe();
      dispatch({ type: 'SET_USER', payload: fullUser });
    } catch {
      dispatch({ type: 'SET_USER', payload: loginRes });
    }
    authChannel?.postMessage({ type: 'LOGIN' });
  };

  const loginGoogle = async () => {
    const loginRes = await apiLoginGoogle();
    try {
      const fullUser = await getMe();
      dispatch({ type: 'SET_USER', payload: fullUser });
    } catch {
      dispatch({ type: 'SET_USER', payload: loginRes });
    }
    authChannel?.postMessage({ type: 'LOGIN' });
  };

  const register = async (name, email, password) => {
    const regRes = await apiRegister(name, email, password);
    try {
      const fullUser = await getMe();
      dispatch({ type: 'SET_USER', payload: fullUser });
    } catch {
      dispatch({ type: 'SET_USER', payload: regRes });
    }
    authChannel?.postMessage({ type: 'LOGIN' });
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      dispatch({ type: 'CLEAR_USER' });
      authChannel?.postMessage({ type: 'LOGOUT' });
    }
  };

  const updateUser = (data) => {
    dispatch({ type: 'SET_USER', payload: { ...state.user, ...data } });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, loginGoogle, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context || defaultAuthContext;
}

