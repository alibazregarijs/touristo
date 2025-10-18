'use client';
import React from 'react';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import { Box } from '@mui/material';
import Pagination from '../../../../../components/Pagination';
import type { Trip } from '@/types';

const ListTrips = ({
  trips,
  isPaginated,
}: {
  trips: Trip[];
  isPaginated?: boolean;
}) => {
  const [tripsToShow, setTripsToShow] = React.useState(trips.slice(0, 8));
  const [page, setPage] = React.useState(1);

  return (
    <Box>
      <TripsCard items={tripsToShow} isPaginated={isPaginated || false} />
      {isPaginated && (
        <Pagination
          setItemsToShow={setTripsToShow}
          dataItems={trips}
          pageSize={4}
          page={page}
          setPage={setPage}
        />
      )}
    </Box>
  );
};

export default ListTrips;
