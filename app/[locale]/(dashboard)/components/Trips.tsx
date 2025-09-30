import React from 'react';
import { Box, Grid } from '@mui/material';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';

const TripsCard = ({ items }: { items: any }) => {
  return (
    <Grid container spacing={2} mt={4}>
      {items.map((item: any) => (
        <Grid size={{ xs: 6, lg: 3 }} key={item.title}>
          <TripsStateCard trip={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TripsCard;
