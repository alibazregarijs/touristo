import React from 'react';
import { Box, Grid, Typography, Divider, Stack, Avatar } from '@mui/material';
import type { LatestUserSignupsType, Trip } from '@/types';
import { extractTripSummary } from '@/lib';

interface Props<T> {
  lastUser?: boolean;
  item: T[];
}

function LatestUserSignups<T>({ lastUser = false, item }: Props<T>) {
  const items = !lastUser
    ? (item as unknown as Trip[]).map((trip) => extractTripSummary(trip))
    : item;

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 2px 6px 0px #0D0A2C14',
        borderRadius: '20px',
        minHeight: '450px',
        maxHeight: '500px',
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
              {lastUser ? 'ITINERARY CREATED' : 'TRAVEL DURATION'}
            </Typography>
          </Stack>

          {items.map((entry: any, index) => (
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
                <Avatar
                  sx={{
                    bgcolor: '#fd366e',
                    width: 40,
                    height: 40,
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  {lastUser
                    ? entry.username?.charAt(0).toUpperCase()
                    : entry.name?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                  className="text-black-1"
                  fontWeight={600}
                  fontSize="12px"
                  lineHeight="14px"
                >
                  {lastUser ? entry.username : entry.name}
                </Typography>
              </Stack>

              <Typography
                className="text-black-1"
                fontWeight={400}
                fontSize="10px"
                lineHeight="14px"
                paddingRight={lastUser ? '5.7rem' : '3.5rem'}
              >
                {lastUser
                  ? entry.countOfItineraryCreated
                  : (entry.travelDates ?? 'N/A')}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LatestUserSignups;
