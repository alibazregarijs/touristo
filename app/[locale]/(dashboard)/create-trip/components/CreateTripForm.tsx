'use client';
import React, { useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import SelectField from '@/app/[locale]/(dashboard)/AI-trips/components/SelectField';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { flagUrl, getImages } from '@/lib';
import { TripFormValues } from '@/types';
import {
  COUNTRIES,
  GROUP_TYPES,
  TRAVEL_STYLES,
  INTEREST,
  BUDGET,
  defaultValues,
} from '@/constants';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const CreateTripForm = () => {
  const [isSubmitting, startTransition] = useTransition();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const getTripsAction = useAction(api.groqai.getTripsAction);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<TripFormValues>(defaultValues);

  const selectedCountry = watch('country');

  const onSubmit = async (data: TripFormValues) => {
    startTransition(async () => {
      if (!data.country || !data.interest || !data.travelStyle) return;

      const imageUrl = await getImages(
        data.country.label,
        data.interest,
        data.travelStyle
      );

      const formData = {
        ...data,
        country: data.country, // non-null
        duration: Number(data.duration), // number
        userId: userId || '',
        imageUrls: imageUrl as string[], // correct type
      };

      const result = await getTripsAction(formData);
      console.log('Form Data:', result);
    });
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
            renderOption={(props, option) => {
              const { key, ...otherProps } = props;
              return (
                <Box
                  key={key} // ✅ pass key directly
                  component="li"
                  {...otherProps} // ✅ spread the rest
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

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Duration"
          placeholder="Enter number of days (e.g., 5, 12)"
          error={!!errors.duration}
          helperText={errors.duration?.message}
          {...register('duration', { required: 'Duration is required' })}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

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
        {selectedCountry && (
          <Map lat={selectedCountry!.lat} lng={selectedCountry!.lng} />
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={16} sx={{ color: 'white' }} />
          ) : (
            <Image src="/icons/star.png" alt="star" width={15} height={15} />
          )}
          {isSubmitting ? 'Generating...' : 'Generate a trip'}
        </Button>
      </Box>
    </form>
  );
};

export default CreateTripForm;
