import React from 'react';
import { Button } from '@mui/material';

const COLORS_BUDGET = [
  {
    type: 'RELAXED',
    bg: '#F7EDF6',
    color: '#C11574',
  },
  {
    type: 'Nature & Outdoors',
    bg: '#E9F3FB',
    color: '#175CD3',
  },
  {
    type: 'City Exploration',
    bg: '#ECFDF3',
    color: '#027A48',
  },
  {
    type: 'Adventure',
    bg: '#FFF1F3',
    color: '#C01048',
  },
  {
    type: 'Cultural',
    bg: '#FFF4ED',
    color: '#B93815',
  },
  {
    type: 'Relaxation',
    bg: '#F0F9FF',
    color: '#026AA2',
  },

  // 💰 Budget tiers with distinct palette
  {
    type: 'Mid-Range',
    bg: '#FFF7E6', // warm amber background
    color: '#B54708', // deep orange text
  },
  {
    type: 'Luxury',
    bg: '#F3F0FF', // soft lavender background
    color: '#6941C6', // royal purple text
  },
  {
    type: 'Premium',
    bg: '#E6FFFA', // aqua background
    color: '#0F766E', // teal text
  },
  {
    type: 'Budget',
    bg: '#FFF0F6', // light pink background
    color: '#C11574', // magenta text
  },
];

const MButton = ({ type, title }: { type: string; title: string }) => {
  // Find the matching color config
  const colorConfig = COLORS_BUDGET.find((color) => color.type === type);

  // Optional: handle case when type is not found
  if (!colorConfig) {
    console.warn(`No color config found for type: "${type}"`);
    return <Button variant="contained">{type}</Button>;
  }

  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: '40px',
        backgroundColor: colorConfig.bg,
        color: colorConfig.color,
        '&:hover': {
          backgroundColor: colorConfig.bg, // keep same on hover
        },
      }}
    >
      {title}
    </Button>
  );
};

export default MButton;
