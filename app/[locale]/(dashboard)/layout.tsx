import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from '@/components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container spacing={2}>
      <Grid sx={{ backgroundColor: '#FFFFFF' }} size={{ xs: 12, md: 2 }}>
        <Sidebar />
      </Grid>

      <Grid size={{ xs: 12, md: 10 }}>{children}</Grid>
    </Grid>
  );
};

export default Layout;
