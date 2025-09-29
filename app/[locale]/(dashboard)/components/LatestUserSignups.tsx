import React from 'react';
import { Box, Grid, Typography, Divider, Stack } from '@mui/material';
import Image from 'next/image';

type itemT = {
  name: string;
  itineraryCreated: string;
  image: string;
};

interface Props {
  lastUser?: boolean;
  item: itemT[];
}

const LatestUserSignups = ({ lastUser = false, item }: Props) => {
  return (
    <Box
      p={4}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        borderRadius: '20px',
        maxHeight: '400px',
      }}
    >
      {/* Title */}
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Typography
            fontSize="16px"
            lineHeight="20px"
            fontWeight={600}
            className="text-black-1"
          >
            {lastUser ? 'Latest user signups' : 'Latest trip bookings'}
          </Typography>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider
        sx={{
          my: 2,
          borderColor: '#E5E5EF',
        }}
      />

      {/* Header Row */}
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            px={2}
            mb={1}
          >
            <Typography fontWeight={400} fontSize="10px" lineHeight="14px">
              {lastUser ? 'NAME' : 'BOOKING'}
            </Typography>
            <Typography fontWeight={400} fontSize="10px" lineHeight="14px">
              {lastUser ? ' ITINERARY CREATED' : 'TRAVEL DATES'}
            </Typography>
          </Stack>
          {item.map((user, index) => (
            <Stack
              key={index}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={2}
              sx={{ backgroundColor: '#F9FBFC' }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Image
                  src={user.image}
                  alt="user"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
                <Typography
                  className="text-black-1"
                  fontWeight={600}
                  fontSize="12px"
                  lineHeight="14px"
                >
                  {user.name}
                </Typography>
              </Stack>
              <Typography
                className="text-black-1"
                fontWeight={400}
                fontSize="10px"
                lineHeight="14px"
                paddingRight={lastUser ? '5.7rem' : '0'}
              >
                {user.itineraryCreated}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default LatestUserSignups;
