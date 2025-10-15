'use client';
import * as React from 'react';
import { Card, CardContent, Box, Typography, Divider } from '@mui/material';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { splitIntoRanges, formatYAxis } from '@/lib';
import type { UserGrowthType } from '@/types';
import { useLocale, useTranslations } from 'next-intl';

export default function UserGrowthChart({
  userGrowth,
}: {
  userGrowth: UserGrowthType[];
}) {
  const rtl = useLocale();
  const t = useTranslations();
  const userGrowthObj = userGrowth.map((d) => ({
    month: d.month,
    ...splitIntoRanges(d.users),
    users: d.users,
  }));

  return (
    <Card
      sx={{
        height: 360,
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        backgroundColor: '#FFFF',
        borderRadius: '20px',
      }}
    >
      <Typography
        mx={2}
        mt={4}
        lineHeight={'24px'}
        fontSize={'18px'}
        fontWeight={'600'}
        className="text-black-1 font-semibold"
      >
        {t('UserGrowthChart.title')}
      </Typography>
      <Divider
        variant="fullWidth"
        sx={{
          my: 2,
          borderColor: '#ECF2EF',
          marginX: '1rem',
        }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={userGrowthObj}
              margin={{ top: 16, right: 24, bottom: 0, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{
                  fontSize: 12,
                  textAnchor: rtl === 'fa' ? 'start' : 'end',
                  dx: rtl === 'fa' ? 0 : -8,
                }}
                tickFormatter={formatYAxis}
                domain={[0, 3200]}
              />

              <Tooltip
                formatter={(value, name) => {
                  if (name !== 'users') return null; // hide range1/2/3
                  return [value, 'Users'];
                }}
              />

              {/* stacked bars for each range */}
              <Bar
                dataKey="range1"
                stackId="users"
                fill="#90caf9"
                barSize={28}
              />
              <Bar
                dataKey="range2"
                stackId="users"
                fill="#42a5f5"
                barSize={28}
              />
              <Bar
                dataKey="range3"
                stackId="users"
                fill="#1976d2"
                barSize={28}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 4, stroke: '#1976d2', fill: '#fff' }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
