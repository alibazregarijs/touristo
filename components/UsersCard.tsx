'use client';
import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Image from 'next/image';

const STATES = {
  TOTAL_USER: 'total_user',
  TOTAL_TRIPS: 'total_trips',
  ACTIVE_USERS_TODAY: 'active_users_today',
} as const;

// Union of the values: "total_user" | "total_trips" | "active_users_today"
export type State = (typeof STATES)[keyof typeof STATES];

const STATE_LABELS: Record<State, string> = {
  total_user: 'Users',
  total_trips: 'Trips',
  active_users_today: 'Active Users Today',
};

// ✅ Define a proper props type
interface UsersCardProps {
  state: State;
  data: number[];
}

export default function UsersCard({ state, data }: UsersCardProps) {
  const isUp = data[data.length - 1] > data[0];
  const lineColor = isUp ? '#12B76A' : '#F04438';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2">{STATE_LABELS[state]}</Typography>
        <Typography variant="h5" fontWeight={600}>
          144k
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
          <Typography variant="body2" sx={{ color: lineColor }}>
            {isUp ? 'Trending up' : 'Trending down'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#7F7E83', ml: 1 }}>
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
