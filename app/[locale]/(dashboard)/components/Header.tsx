'use client';
import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const Header = ({
  title,
  description,
  buttonTitle,
  href,
}: {
  title: string;
  description: string;
  buttonTitle: string;
  href?: string;
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
        <Link href={href || '#'}>
          <Button fullWidth variant="contained">
            {buttonTitle}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default React.memo(Header);
