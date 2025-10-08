'use client';

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
import type { TooltipProps } from 'recharts';

const data = [
  { name: 'Beach', value: 25 },
  { name: 'Cultural', value: 30 },
  { name: 'City', value: 35 },
  { name: 'Nature', value: 20 },
  { name: 'Culinary', value: 40, highlight: true },
  { name: 'Relax', value: 28 },
  { name: 'Adventure', value: 32 },
];

interface tripGrowth {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const value = payload[0].value;
    return (
      <Box
        sx={{
          backgroundColor: '#1E1E2F',
          color: '#fff',
          p: 2,
          borderRadius: '8px',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        {value}%
      </Box>
    );
  }
  return null;
};

export default function TripTrendsChart({
  tripGrowth,
}: {
  tripGrowth: tripGrowth[];
}) {
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
          User Growth
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
              <YAxis domain={[0, 50]} tickFormatter={(val) => `${val}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.highlight ? '#4A3AFF' : '#E5EAFC'}
                  />
                ))}
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
