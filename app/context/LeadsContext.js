import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID to generate unique ids

// Create the LeadsContext
const LeadsContext = createContext();

export const useLeads = () => useContext(LeadsContext);

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  // Load leads from localStorage
  const loadLeads = () => {
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  };

  // Save leads to localStorage
  const saveLeads = (leads) => {
    localStorage.setItem('leads', JSON.stringify(leads));
  };

  // Fetch leads from localStorage
  const fetchLeads = () => {
    loadLeads();
  };

  // Add a new lead and save to localStorage
  const addLead = (lead) => {
    const newLead = { ...lead, id: uuidv4() }; // Add a unique id to each lead
    const newLeads = [...leads, newLead];
    setLeads(newLeads);
    saveLeads(newLeads);
  };

  // Update the state of a specific lead and save to localStorage
  const updateLeadState = (id) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, state: 'REACHED_OUT' } : lead
    );
    setLeads(updatedLeads);
    saveLeads(updatedLeads); // Make sure to save to localStorage
  };

  // Initialize leads when the component mounts
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLeadState, fetchLeads }}>
      {children}
    </LeadsContext.Provider>
  );
};
