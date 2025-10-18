'use client';
import React, { useEffect } from 'react';
import { USER_INFO } from '@/constants';
import { Box, Stack, Button } from '@mui/material';
import UserListHeader from './UserListHeader';
import UserListRow from './UserListRow';
import Pagination from '../../../../../components/Pagination';
import type { UserInfoI } from '@/types';
import { useFilter } from '@/contexts/UserFilterProvider';

const UserListManager = ({ users }: { users: UserInfoI[] }) => {
  const [usersToShow, setUsersToShow] = React.useState<UserInfoI[]>(
    users.slice(0, 4)
  );
  const [page, setPage] = React.useState(1);
  const { filters } = useFilter();

  useEffect(() => {
    let sorted = [...usersToShow];

    switch (filters.sortOption) {
      case 'NAME':
        sorted.sort((a, b) =>
          filters.sortOrder === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
        break;

      case 'EMAIL ADDRESS':
        sorted.sort((a, b) =>
          filters.sortOrder === 'asc'
            ? a.email_address.localeCompare(b.email_address)
            : b.email_address.localeCompare(a.email_address)
        );
        break;

      case 'DATE JOINED':
        sorted.sort((a, b) =>
          filters.sortOrder === 'desc'
            ? new Date(a.date_joined).getTime() -
              new Date(b.date_joined).getTime()
            : new Date(b.date_joined).getTime() -
              new Date(a.date_joined).getTime()
        );
        break;

      case 'ITINERARY CREATED':
        sorted.sort((a, b) =>
          filters.sortOrder === 'desc'
            ? Number(a.itinerary_created) - Number(b.itinerary_created)
            : Number(b.itinerary_created) - Number(a.itinerary_created)
        );
        break;

      case 'STATUS':
        sorted.sort((a, b) =>
          filters.sortOrder === 'asc'
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status)
        );
        break;
    }

    setUsersToShow(sorted);
  }, [filters, users]);

  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 0px 2px 0px #1018280F, 0px 0px 3px 0px #1018281A',
        mt: 3,
      }}
    >
      <UserListHeader />

      {usersToShow.map((user, index) => (
        <UserListRow
          setUsersToShow={setUsersToShow}
          key={user.name}
          user={user}
          index={index}
        />
      ))}

      <Pagination
        page={page}
        setPage={setPage}
        setItemsToShow={setUsersToShow}
        dataItems={users}
      />
    </Box>
  );
};

export default UserListManager;
