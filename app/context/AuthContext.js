"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticatedAlma, setIsAuthenticatedAlma] = useState(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticatedAlma');
    if (storedAuthState === 'true') {
      setIsAuthenticatedAlma(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticatedAlma(true);
    localStorage.setItem('isAuthenticatedAlma', 'true');
  };

  const logout = () => {
    setIsAuthenticatedAlma(false);
    localStorage.removeItem('isAuthenticatedAlma');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticatedAlma, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
