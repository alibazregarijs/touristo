import React from 'react';
import { Box } from '@mui/material';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import UserListManager from './components/UserListManager';
import { USER_INFO } from '@/constants';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import type { UserInfoI } from '@/types';

const Page = async () => {
  const t = await getTranslations();
  const usersQuery = await fetchQuery(api.user.getAllUsers);
  return (
    <Box>
      <Header
        title={t('AllUser.title')}
        description={t('AllUser.description')}
        buttonTitle={t('AllUser.buttonTitle')}
      />
      <UserListManager users={usersQuery} />
    </Box>
  );
};

export default Page;
