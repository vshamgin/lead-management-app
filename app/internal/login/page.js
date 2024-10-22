"use client";

import { useAuth } from '../../context/AuthContext';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // This is for client-side navigation in Next.js
import { useLeads } from '../../context/LeadsContext';

const Login = () => {
  const { login } = useAuth();
  const { fetchLeads } = useLeads();
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (password === 'blah') {
      // await login();
      window.location.href = '/internal/leads';
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button onClick={handleLogin} variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
