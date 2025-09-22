import React from 'react';
import { Grid } from '@mui/material';

const Layout = ({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) => {
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
      <Grid size={{ xs: 12, md: 2 }}>{sidebar}</Grid>

      {/* Main content */}
      <Grid size={{ xs: 12, md: 10 }}>{children}</Grid>
    </Grid>
  );
};

export default Layout;
