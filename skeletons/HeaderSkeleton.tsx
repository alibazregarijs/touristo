'use client';
import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const HeaderSkeleton = () => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Left side skeletons */}
      <Grid>
        <Skeleton variant="text" width={160} height={28} />
        <Skeleton variant="text" width={220} height={20} />
      </Grid>

      {/* Right side skeleton (button placeholder) */}
      <Grid size={{ xs: 12, md: 'auto' }}>
        <Skeleton
          variant="rounded"
          width={120}
          height={36}
          sx={{ borderRadius: 1 }}
        />
      </Grid>
    </Grid>
  );
};

export default HeaderSkeleton;
