'use client';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { type TripT } from '@/types';
import Link from 'next/link';

const TripsStateCard = ({ trip }: { trip: TripT }) => {
  return (
    <Link
      href={{
        pathname: trip?.href,
        query: {
          lat: trip?.lat,
          lng: trip?.lng,
        },
      }}
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
        <Box sx={{ width: '100%', height: 140, position: 'relative' }}>
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover"
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
            {trip.title}
          </Typography>

          {/* Location row */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Image
              src="/icons/location.png"
              alt="location"
              width={16}
              height={16}
            />
            <Typography fontSize="12px" lineHeight="16px" fontWeight={400}>
              {trip.location}
            </Typography>
          </Stack>

          {/* Buttons row */}
          <Stack direction="row" spacing={1} mt={2}>
            {trip.buttons.map((btn, idx) => (
              <Button
                key={idx}
                variant="contained"
                size="small"
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: 120,
                }}
                // Prevent button click from triggering link
                onClick={(e) => e.stopPropagation()}
              >
                {btn}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TripsStateCard;
