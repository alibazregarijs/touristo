import React from 'react';
import { Box, Grid } from '@mui/material';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';

const TripsCard = ({
  items,
  isPaginated,
}: {
  items: any;
  isPaginated: boolean;
}) => {
  return (
    <Grid container spacing={2} mt={4}>
      {items.map((item: any, index: number) => (
        <div key={index}>hi</div>
        // <Grid size={{ xs: 6, lg: !isPaginated ? 4 : 3 }} key={index}>
        //   <TripsStateCard trip={item} />
        // </Grid>
      ))}
    </Grid>
  );
};

export default TripsCard;
