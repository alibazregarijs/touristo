'use client';
import React from 'react';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import { Box } from '@mui/material';
import Pagination from '../../all-user/components/Pagination';
import type { TripT } from '@/types';

const ListTrips = ({
  trips,
  isPaginated,
}: {
  trips: TripT[];
  isPaginated: boolean;
}) => {
  const [tripsToShow, setTripsToShow] = React.useState(trips.slice(0, 8));

  return (
    <Box>
      <TripsCard items={tripsToShow} isPaginated={isPaginated} />
      {isPaginated && (
        <Pagination
          setItemsToShow={setTripsToShow}
          dataItems={trips}
          pageSize={8}
        />
      )}
    </Box>
  );
};

export default ListTrips;
