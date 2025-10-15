'use client';
import { useState } from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from 'recharts';
import type { TripGrowth } from '@/types';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function TripTrendsChart({
  tripGrowth,
}: {
  tripGrowth: TripGrowth[];
}) {
  const t = useTranslations();
  const rtl = useLocale();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Card
      sx={{
        height: 360,
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        backgroundColor: '#FFFF',
        borderRadius: '20px',
      }}
    >
      <CardContent sx={{ pt: 0 }}>
        <Typography
          ml={2}
          mt={4}
          lineHeight="24px"
          fontSize="18px"
          fontWeight="600"
          className="text-black-1 font-semibold"
        >
          {t('TripGrowthChart.title')}
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            my: 2,
            borderColor: '#ECF2EF',
            marginX: '1rem',
          }}
        />
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={tripGrowth}>
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 50]}
                tickFormatter={(val) => `${val}%`}
                tick={{
                  fontSize: 12,
                  textAnchor: rtl === 'fa' ? 'start' : 'end',
                  dx: rtl === 'fa' ? 0 : -8,
                }}
              />
              <Tooltip />
              <Bar
                dataKey="count"
                radius={[4, 4, 0, 0]}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {tripGrowth.map((entry, index) => {
                  const baseFill = entry.highlight ? '#4A3AFF' : '#E5EAFC';
                  const isActive = index === activeIndex;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isActive ? '#7C6CFF' : baseFill} // darker on hover
                      stroke={isActive ? '#4A3AFF' : 'none'} // border on hover
                      strokeWidth={isActive ? 2 : 0}
                      onMouseEnter={() => setActiveIndex(index)}
                    />
                  );
                })}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={() => null}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
