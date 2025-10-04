'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
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

export type CountryOption = {
  code: string;
  label: string;
  lat: number;
  lng: number;
};

type TripFormValues = {
  country: CountryOption | null;
  groupType: string;
  travelStyle: string;
  interest: string;
  budget: string;
};

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

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const CreateTripForm = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<TripFormValues>({
    defaultValues: {
      country: COUNTRIES.find((c) => c.code === 'IR') ?? null,
      groupType: '',
      travelStyle: '',
      interest: '',
      budget: '',
    },
  });

  const onSubmit = (data: TripFormValues) => {
    console.log('Form values:', data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Country Autocomplete */}
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field }) => (
          <Autocomplete
            options={COUNTRIES}
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
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
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                error={!!errors.country}
                helperText={errors.country?.message}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: field.value ? (
                    <InputAdornment position="start">
                      <Image
                        src={flagUrl(field.value.code)}
                        alt={`${field.value.label} flag`}
                        width={24}
                        height={16}
                        style={{ objectFit: 'cover' }}
                      />
                    </InputAdornment>
                  ) : null,
                }}
              />
            )}
          />
        )}
      />

      {/* Other fields */}
      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Group Type"
          placeholder="Select a group type"
          options={GROUP_TYPES}
          error={!!errors.groupType}
          helperText={errors.groupType?.message}
          {...register('groupType', { required: 'Group type is required' })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Travel Style"
          placeholder="Select your travel style"
          options={TRAVEL_STYLES}
          error={!!errors.travelStyle}
          helperText={errors.travelStyle?.message}
          {...register('travelStyle', { required: 'Travel style is required' })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Interests"
          placeholder="Select your interests"
          options={INTEREST}
          error={!!errors.interest}
          helperText={errors.interest?.message}
          {...register('interest', { required: 'Interest is required' })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label="Budget Estimate"
          placeholder="Select your budget preference"
          options={BUDGET}
          error={!!errors.budget}
          helperText={errors.budget?.message}
          {...register('budget', { required: 'Budget is required' })}
        />
      </Box>

      {/* Map stays in its place */}
      <Box sx={{ mt: 3 }}>
        {getValues('country') && (
          <Map
            lat={getValues('country')!.lat}
            lng={getValues('country')!.lng}
          />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
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
    </form>
  );
};

export default CreateTripForm;
