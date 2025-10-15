'use client';
import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Image from 'next/image';
import { STATE_LABELS } from '@/constants';
import { UsersCardProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function UsersCard({
  state,
  data,
  activeUserToday,
}: UsersCardProps) {
  const isUp = data[data.length - 1] > data[0];
  const lineColor = isUp ? '#12B76A' : '#F04438';
  const totalItems = data.reduce((acc, curr) => acc + curr, 0);

  return (
    <Card
      sx={{
        p: 2,
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        borderRadius: '20px',
      }}
    >
      <CardContent>
        <Typography variant="subtitle2">{t(`UserCard.${state}`)}</Typography>
        <Typography variant="h5" fontWeight={600}>
          {!activeUserToday ? totalItems : activeUserToday}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <SparkLineChart data={data} height={40} color={lineColor} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Image
            src={isUp ? '/icons/up.png' : '/icons/down.png'}
            alt="trending"
            width={12}
            height={12}
            style={{ marginRight: 4 }}
          />
          <Typography variant="body2" sx={{ color: lineColor, ml: 0.5 }}>
            {isUp ? t('UserCard.trending_up') : t('UserCard.trending_down')}
          </Typography>
          <Typography variant="body2" sx={{ color: '#7F7E83', ml: 1 }}>
            {t('UserCard.last_month')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
