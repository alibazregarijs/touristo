'use client';
import React from 'react';
import { USER_INFO } from '@/constants';
import { Box, Stack, Button } from '@mui/material';
import UserListHeader from './UserListHeader';
import UserListRow from './UserListRow';
import Pagination from './Pagination';
const UserListManager = () => {
  const [usersToShow, setUsersToShow] = React.useState(USER_INFO.slice(0, 4));
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
        <UserListRow key={user.name} user={user} index={index} />
      ))}

      <Pagination setUsersToShow={setUsersToShow} />
    </Box>
  );
};

export default UserListManager;
