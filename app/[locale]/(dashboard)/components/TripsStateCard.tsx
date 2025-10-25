'use client';
import React from 'react';
import { Box, Card, CardContent, Stack, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { type Trip } from '@/types';
import Link from 'next/link';
import MButton from '@/components/Button';

const TripsStateCard = ({
  trip,
  isPaginated,
}: {
  trip: Trip;
  isPaginated: boolean;
}) => {
  return (
    <Link
      href={'/en/AI-trips/' + trip.id}
      style={{ textDecoration: 'none', color: 'inherit' }}
      passHref
    >
      <Card
        sx={{
          borderRadius: '20px',
          boxShadow: '0px 2px 30px 0px #0000000D',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          height: '100%', // 👈 ensures full height in grid/flex containers
          cursor: 'pointer', // 👈 visual feedback
          '&:hover': {
            boxShadow: '0px 4px 40px 0px #0000001A',
          },
        }}
      >
        {/* Image section */}
        <Box sx={{ width: '100%', height: '340px', position: 'relative' }}>
          <Image
            src={trip.imageUrls?.[0]?.trim()}
            alt={trip.name}
            fill
            className="object-cover"
            unoptimized // 👈 Loads directly in browser, bypassing server
            loading="lazy" // 👈 Still gets lazy loading
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>

        {/* Content section */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1, // 👈 pushes content to use available space
          }}
        >
          {/* Title */}
          <Typography
            fontSize="16px"
            lineHeight="20px"
            fontWeight={600}
            gutterBottom
            className="text-black-1 font-semibold"
          >
            {trip.name}
          </Typography>

          {/* Location row */}
          {trip.itinerary?.length > 0 ? (
            <Stack direction="row" alignItems="center" gap="4px">
              <Image
                src="/icons/location.png"
                alt="Location"
                width={16}
                height={16}
              />
              <Typography fontSize="12px" lineHeight="16px" fontWeight={400}>
                {trip.itinerary[0].location}
              </Typography>
            </Stack>
          ) : null}

          {/* Buttons row */}
          <Stack
            direction={{ xs: 'column', md: 'row' }} // 👈 column on xs/sm, row on md+
            spacing={1}
            mt={2}
          >
            <MButton
              cssClass={isPaginated ? 'text-[12px]! p-1!' : undefined}
              title={trip.travelStyle}
              type={trip.travelStyle}
            />
            <MButton
              cssClass={isPaginated ? 'text-[12px]! p-1!' : undefined}
              title={trip.budget}
              type={trip.budget}
            />
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TripsStateCard;
