// components/AppHeader.js
"use client";

import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const AppHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Alma
        </Typography>

        <Box display="flex" gap={2}>
          <Link href="/" passHref>
            <Button sx={{ color: '#fafafa' }}>Home</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
