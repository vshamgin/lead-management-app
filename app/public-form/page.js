"use client";

import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useLeads } from '../context/LeadsContext';
import { useState } from 'react';

export default function PublicLeadForm() {
  const { addLead } = useLeads();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedVisaCategories, setSelectedVisaCategories] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  
  const onSubmit = async (data) => {
    const newLead = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      linkedin: data.linkedin,
      visasInterested: selectedVisaCategories,
      resume: resumeFile ? resumeFile.name : "No file uploaded",
      country: data.country,
      openText: data.openText,
      state: 'PENDING', // Default state
      submitted: new Date().toLocaleString(), // Include timestamp for when the lead was created
    };
  
    try {
      console.log("newLead onSubmit:", newLead); 
      await addLead(newLead); // Add the lead using the addLead function
      reset(); // Reset the form after submission
      setSelectedVisaCategories([]); // Reset visa categories selection
      setResumeFile(null); // Reset file input
      window.location.href = '/thank-you'; // Redirect to thank you page
    } catch (error) {
      console.error("Failed to submit lead:", error); // Log if there's any error during submission
    }
  };
  

  const handleVisaCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedVisaCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
  };

  //////////////
  const getRandomName = () => {
    const firstNames = ["John", "Jane", "Alex", "Emily", "Michael", "Sarah", "David", "Laura", "Daniel", "Emma"];
    const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Williams", "Jones", "Miller", "Davis", "Garcia", "Martinez"];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return { firstName, lastName };
  };
  
  // Function to set temporary data
  const setTempData = () => {
    const { firstName, lastName } = getRandomName();
    const randomEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("email", randomEmail);
    setValue("country", "United States");
    setValue("linkedin", `https://www.linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`);
    setValue("openText", "Looking for options to stay longer and work in the US.");
    setSelectedVisaCategories(["O-1", "EB-1A"]);
    setResumeFile(null); // No file upload for temp data
  };
  //////////

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" gap={2} mt={5}>
      <Typography variant="h5" gutterBottom>Want to understand your visa options?</Typography>
      <Typography variant="body2" textAlign="center">
        Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
      </Typography>

      <Box width="80%" maxWidth="500px" display="flex" flexDirection="column" gap={2}>
        <TextField {...register("firstName", { required: true })} label="First Name" fullWidth />
        <TextField {...register("lastName", { required: true })} label="Last Name" fullWidth />
        <TextField {...register("email", { required: true })} label="Email" type="email" fullWidth />
        
        {/* Dropdown for Country */}
        <FormControl fullWidth>
          <InputLabel>Country of Citizenship</InputLabel>
          <Select {...register("country", { required: false })} defaultValue="United States">
            <MenuItem value="United States">United States</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>
        
        <TextField {...register("linkedin")} label="LinkedIn / Personal Website URL" fullWidth />

        {/* File Upload for Resume */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          style={{ marginTop: '16px' }}
        />

        {/* Visa Categories */}
        <Typography variant="h6" mt={3}>Visa categories of interest?</Typography>
        <FormControlLabel
          control={<Checkbox checked={selectedVisaCategories.includes("O-1")} onChange={handleVisaCategoryChange} value="O-1" />}
          label="O-1"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedVisaCategories.includes("EB-1A")} onChange={handleVisaCategoryChange} value="EB-1A" />}
          label="EB-1A"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedVisaCategories.includes("EB-2 NIW")} onChange={handleVisaCategoryChange} value="EB-2 NIW" />}
          label="EB-2 NIW"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedVisaCategories.includes("I don't know")} onChange={handleVisaCategoryChange} value="I don't know" />}
          label="I don't know"
        />

        {/* Open Text Area */}
        <Typography variant="h6" mt={3}>How can we help you?</Typography>
        <TextField
          {...register("openText", { required: true })}
          placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
          multiline
          rows={4}
          fullWidth
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>

        {/* Temp Data Button */}
          <Button onClick={setTempData} variant="outlined" color="secondary" fullWidth>
          Fill with Temp Data
        </Button>
      </Box>
    </Box>
  );
}
