import React from 'react';
import { Box } from '@mui/material';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import UserListManager from './components/UserListManager';
import { USER_INFO } from '@/constants';

const Page = () => {
  return (
    <Box>
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
        buttonTitle="Add new user"
      />
      <UserListManager users={USER_INFO} />
    </Box>
  );
};

export default Page;
