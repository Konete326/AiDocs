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

const AuthContext = createContext();

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
    return () => { isMounted = false; };
  }, []);

  const login = async (email, password) => {
    const user = await apiLogin(email, password);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const loginGoogle = async () => {
    const user = await apiLoginGoogle();
    dispatch({ type: 'SET_USER', payload: user });
  };

  const register = async (name, email, password) => {
    const user = await apiRegister(name, email, password);
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      dispatch({ type: 'CLEAR_USER' });
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
