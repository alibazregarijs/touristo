import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: '#F9FBFC',
        minHeight: '100vh',
        borderRadius: '16px',
      }}
    >
      {/* Sidebar */}
      <Grid size={{ xs: 12, md: 2 }}>
        <Sidebar />
      </Grid>

      {/* Main content */}
      <Grid size={{ xs: 12, md: 10 }}>{children}</Grid>
    </Grid>
  );
};

export default Layout;
