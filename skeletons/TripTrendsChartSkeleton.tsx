'use client';
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Skeleton,
} from '@mui/material';

export default function TripTrendsChartSkeleton() {
  return (
    <Card
      sx={{
        height: 360,
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        backgroundColor: '#FFFF',
        borderRadius: '20px',
      }}
    >
      <CardContent sx={{ pt: 0 }}>
        {/* Title skeleton */}
        <Typography ml={2} mt={4}>
          <Skeleton variant="text" width={160} height={28} />
        </Typography>

        <Divider
          variant="fullWidth"
          sx={{
            my: 2,
            borderColor: '#ECF2EF',
            marginX: '1rem',
          }}
        />

        {/* Chart area skeleton */}
        <Box sx={{ height: 280 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
