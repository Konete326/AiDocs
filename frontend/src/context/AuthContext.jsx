// Auth Context for global state
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

import { setApiToken } from '../services/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData, token) => {
    setApiToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setApiToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
