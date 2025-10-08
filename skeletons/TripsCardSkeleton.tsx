'use client';
import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const TripsCardSkeleton = ({ isPaginated }: { isPaginated: boolean }) => {
  // Show 6 placeholders if paginated, otherwise 3
  const placeholderCount = isPaginated ? 6 : 3;

  return (
    <Grid container spacing={2} mt={4}>
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <Grid size={{ xs: 6, lg: !isPaginated ? 4 : 3 }} key={i}>
          <Skeleton variant="rounded" height={180} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TripsCardSkeleton;
