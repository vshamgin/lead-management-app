"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useLeads } from './LeadsContext'; // Adjust the path as needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticatedAlma, setIsAuthenticatedAlma] = useState(false);
  const { fetchLeads } = useLeads();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticatedAlma');
    if (storedAuthState === 'true') {
      setIsAuthenticatedAlma(true);
      fetchLeads(); // Make sure to fetch leads immediately after checking stored authentication state
    }
  }, []);

  const login = () => {
    setIsAuthenticatedAlma(true);
    localStorage.setItem('isAuthenticatedAlma', 'true');
    fetchLeads(); // Fetch leads immediately after logging in
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
