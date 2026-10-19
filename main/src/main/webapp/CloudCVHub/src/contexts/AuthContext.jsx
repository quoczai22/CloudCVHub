import { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken, userData = null) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    setToken(newToken);
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      setToken(currentToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
