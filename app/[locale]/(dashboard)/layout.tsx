import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container>
      <Grid
        size={{ xs: 12, md: 2 }}
        sx={{ maxHeight: '100vh', backgroundColor: '#FFFF' }}
      >
        <Sidebar />
      </Grid>

      <Grid
        size={{ xs: 12, md: 10 }}
        sx={{ padding: '1rem 1rem', maxHeight: '100vh' }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
