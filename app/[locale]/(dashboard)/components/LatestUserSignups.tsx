import React from 'react';
import { Box, Grid, Typography, Divider, Stack } from '@mui/material';
import Image from 'next/image';

const userData = [
  {
    name: 'James Anderson',
    itineraryCreated: '12',
    image: '/images/user-1.png',
  },
  {
    name: 'James Alexander',
    itineraryCreated: '6',
    image: '/images/user-2.png',
  },
  {
    name: 'Hana Anderson',
    itineraryCreated: '6',
    image: '/images/user-3.png',
  },
  {
    name: 'Awadhi Thomas',
    itineraryCreated: '16',
    image: '/images/user-4.png',
  },
];

const LatestUserSignups = () => {
  return (
    <Box
      p={4}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        borderRadius: '20px',
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
            Latest user signups
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
              NAME
            </Typography>
            <Typography fontWeight={400} fontSize="10px" lineHeight="14px">
              ITINERARY CREATED
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      {/* User Row */}
      <Grid container>
        <Grid size={{ xs: 12 }}>
          {userData.map((user, index) => (
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
                paddingRight={'5.7rem'}
                fontSize="10px"
                lineHeight="14px"
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
