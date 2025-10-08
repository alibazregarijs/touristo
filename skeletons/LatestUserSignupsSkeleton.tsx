'use client';
import React from 'react';
import { Box, Grid, Typography, Divider, Stack, Skeleton } from '@mui/material';

interface Props {
  lastUser?: boolean;
  rows?: number; // how many placeholder rows to render
}

const LatestUserSignupsSkeleton = ({ lastUser = false, rows = 4 }: Props) => {
  return (
    <Box
      p={4}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        borderRadius: '20px',
        maxHeight: '400px',
      }}
    >
      {/* Title */}
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Typography fontSize="16px" lineHeight="20px" fontWeight={600}>
            <Skeleton variant="text" width={180} height={24} />
          </Typography>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider
        sx={{
          my: 2,
          borderColor: '#E5E5EF',
        }}
      />

      {/* Header Row */}
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px={2}
            mb={1}
          >
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="text" width={100} height={16} />
          </Stack>

          {/* Placeholder rows */}
          {Array.from({ length: rows }).map((_, i) => (
            <Stack
              key={i}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={2}
              sx={{ backgroundColor: '#F9FBFC', mb: 1 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width={100} height={20} />
              </Stack>
              <Skeleton variant="text" width={80} height={16} />
            </Stack>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestUserSignupsSkeleton;
