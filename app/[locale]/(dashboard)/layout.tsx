import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container sx={{ backgroundColor: '#F9FBFC' }}>
      <Grid sx={{ backgroundColor: '#FFFFFF' }} size={{ xs: 12, md: 2 }}>
        <Sidebar />
      </Grid>

      <Grid size={{ xs: 12, md: 10 }} sx={{ padding: '1rem 1rem' }}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
