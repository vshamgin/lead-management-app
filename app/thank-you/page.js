"use client";

import { Button, Box, Typography } from '@mui/material';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <Box textAlign="center" mt={10} display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4" gutterBottom>Thank You</Typography>
      <Typography variant="body1">
        Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
      </Typography>

      {/* Go Back to Homepage Button */}
      <Link href="/" passHref>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Go Back to Homepage
        </Button>
      </Link>
    </Box>
  );
};

export default ThankYouPage;
