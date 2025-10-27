import React from 'react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import { Box } from '@mui/material';
import CreateTrip from '@/app/[locale]/(dashboard)/create-trip/components/CreateTrip';
import { getTranslations } from 'next-intl/server';

const page = async () => {
  const t = await getTranslations();
  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title={t('CreateTrip.title')}
        description={t('CreateTrip.description')}
        buttonTitle={t('CreateTrip.buttonTitle')}
        href="/en/AI-trips"
      />
      <CreateTrip />
    </Box>
  );
};

export default page;
