import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the LeadsContext
const LeadsContext = createContext();

export const useLeads = () => useContext(LeadsContext);

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);

  // Fetch leads from the API endpoint
//   const fetchLeads = async () => {
//     try {
//       const response = await fetch('/api/leads');
//       if (!response.ok) throw new Error('Failed to fetch leads.');
//       const data = await response.json();
//       setLeads(data);
//     } catch (error) {
//       console.error("Failed to fetch leads:", error);
//     }
//   };

    const fetchLeads = async () => {
        try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads.');
        const data = await response.json();
        console.error("leads in fetch:", data);
        setLeads(data);
        } catch (error) {
        console.error("Failed to fetch leads:", error);
        }
    };

  // Add a new lead using the API endpoint
  const addLead = async (lead) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      });
  
      if (!response.ok) throw new Error('Failed to add lead.');
      const newLead = await response.json();
  
      console.log("newLead:", newLead);
  
      // Log the previous leads inside the callback to get the actual state
      setLeads((prevLeads) => {
        console.log("Previous leads in setLeads:", prevLeads);
        return [...prevLeads, newLead];
      });
    } catch (error) {
      console.error("Failed to add lead:", error);
    }
  };

  useEffect(() => {
    console.log("Updated leads:", leads);
  }, [leads]);
  

  // Update the state of a lead
  const updateLeadState = async (id) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to update lead state.');
  
      const updatedLead = await response.json();
  
      // Update the local state with the updated lead
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
      );
    } catch (error) {
      console.error("Failed to update lead state:", error);
    }
  };
  

  // Re-fetch leads when the component mounts
  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <LeadsContext.Provider value={{ leads, addLead, fetchLeads, updateLeadState }}>
      {children}
    </LeadsContext.Provider>
  );
};
