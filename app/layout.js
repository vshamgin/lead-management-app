"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LeadsProvider } from './context/LeadsContext';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <LeadsProvider>
            <AuthProvider>
              <CssBaseline />
              {children}
            </AuthProvider>
          </LeadsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
