'use client';
import React, { useState } from 'react';
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { COUNTRIES } from '@/constants';
import SelectField from './SelectField';
import dynamic from 'next/dynamic';

const flagUrl = (code: string) => `https://flagsapi.com/${code}/flat/32.png`;

const GROUP_TYPES = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];
const TRAVEL_STYLES = [
  'RELAXED',
  'Nature & Outdoors',
  'City Exploration',
  'Luxury',
  'Adventure',
  'Cultural',
  'Relaxation',
];
const INTEREST = [
  'Food & Culinary',
  'Hiking & Nature Walks',
  'Historical Sites',
  'Museums & Art',
  'Beaches & Water Activities',
  'Nightlife & Bars',
  'Photography Spots',
  'Shopping',
  'Local Experiences',
];
const BUDGET = ['Mid-Range', 'Luxury', 'Premium', 'Budget'];

export type CountryOption = {
  code: string;
  label: string;
  lat: number;
  lng: number;
};

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional loading fallback
});

const CreateTripForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    COUNTRIES.find((c) => c.code === 'IR') ?? null
  );

  const handleGenerateTrip = () => {
    console.log('Generate a trip');
  };

  return (
    <Box>
      <Autocomplete
        options={COUNTRIES}
        onChange={(_, newValue) => setSelectedCountry(newValue)}
        defaultValue={COUNTRIES.find((c) => c.code === 'IR')}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <Box
              component="li"
              key={key}
              {...rest}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <Image
                src={flagUrl(option.code)}
                alt={`${option.label} flag`}
                width={24}
                height={16}
                style={{ objectFit: 'cover' }}
              />
              {option.label} ({option.code})
            </Box>
          );
        }}
        renderInput={(params) => {
          const selected = params.inputProps.value
            ? COUNTRIES.find((c) => c.label === params.inputProps.value)
            : null;

          return (
            <TextField
              {...params}
              label="Country"
              InputProps={{
                ...params.InputProps,
                startAdornment: selected ? (
                  <InputAdornment position="start">
                    <Image
                      src={flagUrl(selected.code)}
                      alt={`${selected.label} flag`}
                      width={24}
                      height={16}
                      style={{ objectFit: 'cover' }}
                    />
                  </InputAdornment>
                ) : null,
              }}
            />
          );
        }}
      />
      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Group Type"
          placeholder="Select a group type"
          options={GROUP_TYPES}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Travel Style"
          placeholder="Select your travel style"
          options={TRAVEL_STYLES}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Interests"
          placeholder="Select your interests"
          options={INTEREST}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Budget Estimate"
          placeholder="Select your budget preference"
          options={BUDGET}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        {selectedCountry && (
          <Map lat={selectedCountry.lat} lng={selectedCountry.lng} />
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleGenerateTrip}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Image src="/icons/star.png" alt="star" width={15} height={15} />
          Generate a trip
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTripForm;
