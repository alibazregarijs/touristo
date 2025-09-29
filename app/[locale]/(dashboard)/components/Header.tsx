import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

const Header = ({
  title,
  description,
  buttonTitle,
}: {
  title: string;
  description: string;
  buttonTitle: string;
}) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Left side */}
      <Grid alignItems="center">
        <Typography
          fontSize="16px"
          className="text-black-1 font-semibold"
          fontWeight={600}
        >
          {title}
        </Typography>
        <Typography className="text-white-2" fontSize="12px">
          {description}
        </Typography>
      </Grid>

      {/* Right side */}
      <Grid size={{ xs: 12, md: 'auto' }}>
        <Button fullWidth variant="contained">
          {buttonTitle}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
