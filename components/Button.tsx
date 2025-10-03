import React from 'react';
import { Button } from '@mui/material';

const COLORS = [
  {
    type: 'Luxury',
    bg: '#F7EDF6',
    color: '#C11574',
  },
  {
    type: 'Beach',
    bg: '#E9F3FB',
    color: '#175CD3',
  },
  {
    type: 'Mountain',
    bg: '#ECFDF3',
    color: '#027A48',
  },
  {
    type: 'Budget',
    bg: '#F0F9FF',
    color: '#026AA2',
  },
  {
    type: 'Adventurous',
    bg: '#FFF1F3',
    color: '#C01048',
  },
  {
    type: 'Sport',
    bg: '#FFF4ED',
    color: '#B93815',
  },
  {
    type: 'Solo Travel',
    bg: '#F0F9FF',
    color: '#026AA2',
  },
];

const MButton = ({ type, title }: { type: string; title: string }) => {
  // Find the matching color config
  const colorConfig = COLORS.find((color) => color.type === type);

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
