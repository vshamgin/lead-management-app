"use client";

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" gutterBottom>Lead Management App</Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Link href="/public-form" passHref>
          <Button variant="contained" color="primary">Public Lead Form</Button>
        </Link>
        <Link href="/internal/login">
          <Button variant="contained" color="secondary">Internal Login</Button>
        </Link>
      </Box>
    </Box>
  );
}
