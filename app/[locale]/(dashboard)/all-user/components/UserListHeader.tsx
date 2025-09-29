import React from 'react';
import { Grid, Typography } from '@mui/material';

const TITLES = [
  'NAME',
  'EMAIL ADDRESS',
  'DATE JOINED',
  'ITINERARY CREATED',
  'STATUS',
  '', // for trash column
];

const UserListHeader = () => (
  <Grid container spacing={2} p={2} sx={{ mb: 2 }}>
    {TITLES.map((title) => (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={title}>
        <Typography
          fontWeight={600}
          fontSize="12px"
          color="text.secondary"
          noWrap
        >
          {title}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

export default UserListHeader;
