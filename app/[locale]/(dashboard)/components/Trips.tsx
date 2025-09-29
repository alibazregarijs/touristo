import React from 'react';
import { Box, Grid } from '@mui/material';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';

const tripsObj = [
  {
    title: 'Thornridge Cir. Shiloh',
    location: 'St George’s Ln Singapore',
    buttons: ['Mountains', 'City'],
    image: '/images/trip-1.png',
  },
  {
    title: 'Roraima Tepui',
    location: 'Canaima Park, Venezuela',
    buttons: ['Solo travel', 'Budget'],
    image: '/images/trip-2.png',
  },
  {
    title: 'Socotra Island',
    location: 'Yemen',
    buttons: ['Luxury', 'Beach'],
    image: '/images/trip-3.png',
  },
  {
    title: 'San Lake Baikal',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
  },
];

const TripsCard = () => {
  return (
    <Grid container spacing={2} mt={4}>
      {tripsObj.map((trip) => (
        <Grid size={{ xs: 6, lg: 3 }} key={trip.title}>
          <TripsStateCard trip={trip} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TripsCard;
