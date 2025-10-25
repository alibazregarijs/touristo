import React from 'react';
import { Button } from '@mui/material';
import { COLORS_BUDGET } from '@/constants';

const MButton = ({
  type,
  title,
  cssClass,
}: {
  type: string;
  title: string;
  cssClass?: string | undefined;
}) => {
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
      className={cssClass}
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

export default React.memo(MButton);
