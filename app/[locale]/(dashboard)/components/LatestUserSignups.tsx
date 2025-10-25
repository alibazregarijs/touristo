import React from 'react';
import { Box, Grid, Typography, Divider, Stack, Avatar } from '@mui/material';
import type { Trip, Props } from '@/types';
import { extractTripSummary } from '@/lib';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

function LatestUserSignups<T>({ lastUser = false, item }: Props<T>) {
  const t = useTranslations();
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
            {lastUser
              ? t('LatestUserSignups.title')
              : t('LatestTripBookings.title')}
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
              {lastUser
                ? t('LatestUserSignups.name')
                : t('LatestTripBookings.name')}
            </Typography>
            <Typography fontWeight={400} fontSize="10px" lineHeight="14px">
              {lastUser
                ? t('LatestUserSignups.Itinerary')
                : t('LatestUserSignups.duration')}
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
                  data-testid="initials-avatar"
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
                align="center" // 👈 this is the right prop
              >
                {lastUser
                  ? entry.countOfItineraryCreated
                  : `${entry.travelDates?.match(/\d+/)?.[0] ?? 'N/A'} ${t('LatestUserSignups.Days')}`}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default LatestUserSignups;
