'use client';
import React from 'react';
import { Grid } from '@mui/material';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';
import { Trip } from '@/types';

const TripsCard = ({
  items,
  isPaginated,
}: {
  items: Trip[];
  isPaginated: boolean;
}) => {
  return (
    <Grid container spacing={2} mt={4}>
      {items.map((item) => (
        <Grid size={{ xs: 6, lg: !isPaginated ? 4 : 3 }} key={item.id}>
          <TripsStateCard trip={item} isPaginated={isPaginated} />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(TripsCard);
