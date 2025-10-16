'use client';
import React from 'react';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading fallback
});

const ClientMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const t = useTranslations();
  return (
    <>
      <Map lat={lat} lng={lng} />
      <Button variant="contained" sx={{ mt: 2 }} fullWidth>
        {t('AItripHeader.payAndJoin')}
      </Button>
    </>
  );
};

export default ClientMap;
