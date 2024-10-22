"use client";

import { useAuth } from '../../context/AuthContext';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // This is for client-side navigation in Next.js

const Login = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === '12') {
      login(); // Authenticate and set state
      router.push('/internal/leads'); // Navigate to leads page after login
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      mt={5} 
      width="100%"
    >
      <Box 
        sx={{ 
          width: '33%', // 1/3 of the screen width
          minWidth: '300px' // Minimum width for smaller screens
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">Login</Typography>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button 
          onClick={handleLogin} 
          variant="contained" 
          color="primary" 
          sx={{ 
            mt: 2, 
            width: '100%' // Ensure button takes full width of the parent box
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
