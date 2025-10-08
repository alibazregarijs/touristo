'use client';
import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const StatsCardsSkeleton = () => {
  return (
    <Grid container spacing={1} mt={2}>
      {[...Array(3)].map((_, i) => (
        <Grid size={{ xs: 12, lg: 4 }} key={i}>
          <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCardsSkeleton;
