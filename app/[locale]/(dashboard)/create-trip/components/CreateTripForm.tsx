'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import Image from 'next/image';
import SelectField from '@/app/[locale]/(dashboard)/AI-trips/components/SelectField';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { flagUrl, getImages } from '@/lib';
import { TripFormValues } from '@/types';
import { COUNTRIES, defaultValues } from '@/constants';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const CreateTripForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const isRTL = useLocale() === 'fa';

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTripsAction = useAction(api.groqai.getTripsAction);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TripFormValues>(defaultValues);

  const selectedCountry = watch('country');

  const onSubmit = async (data: TripFormValues) => {
    setIsSubmitting(true);
    if (!data.country || !data.interest || !data.travelStyle) return;

    const imageUrl = await getImages(
      data.country.label,
      data.interest,
      data.travelStyle
    );

    if (userId) {
      const formData = {
        ...data,
        country: data.country, // non-null
        duration: Number(data.duration), // number
        userId: userId,
        imageUrls: imageUrl as string[], // correct type
      };
      try {
        const result = await getTripsAction(formData);
        if (result.success) {
          router.push(`/en/AI-trips/${result.tripId._id}`);
        } else {
          setErrorMessage(t('CreateTripForm.createTripError'));
          setShowError(true);
        }
      } catch (error) {
        setErrorMessage(t('CreateTripForm.CreateTripFormGenerate'));
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form aria-label="Create trip" onSubmit={handleSubmit(onSubmit)}>
      {/* Country Autocomplete */}
      <Controller
        name="country"
        control={control}
        rules={{ required: t('CreateTrip.CountryRequired') }}
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
                label={t('CreateTrip.countryLable')}
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
          label={t('CreateTrip.durationLable')}
          placeholder={t('CreateTrip.durationHolder')}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          {...register('duration', {
            required: t('CreateTrip.DurationRequired'),
          })}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      {/* Other fields */}
      <Box sx={{ mt: 3 }}>
        <SelectField
          label={t('CreateTrip.groupTypeLable')}
          placeholder={t('CreateTrip.groupTypeHolder')}
          options={Object.values(t.raw('GroupType'))}
          error={!!errors.groupType}
          helperText={errors.groupType?.message}
          {...register('groupType', {
            required: t('CreateTrip.GroupTypeRequired'),
          })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label={t('CreateTrip.travelStyleLable')}
          placeholder={t('CreateTrip.travelStyleHolder')}
          options={Object.values(t.raw('TravelStyle'))}
          error={!!errors.travelStyle}
          helperText={errors.travelStyle?.message}
          {...register('travelStyle', {
            required: t('CreateTrip.TravelStyleRequired'),
          })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label={t('CreateTrip.interestLable')}
          placeholder={t('CreateTrip.interestHolder')}
          options={Object.values(t.raw('Interest'))}
          error={!!errors.interest}
          helperText={errors.interest?.message}
          {...register('interest', {
            required: t('CreateTrip.InterestRequired'),
          })}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <SelectField
          label={t('CreateTrip.budgetLable')}
          placeholder={t('CreateTrip.budgetHolder')}
          options={Object.values(t.raw('Budget'))}
          error={!!errors.budget}
          helperText={errors.budget?.message}
          {...register('budget', { required: t('CreateTrip.BudgetRequired') })}
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
            flexDirection: isRTL ? 'row-reverse' : 'row', // 👈 flip order in RTL
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={16} sx={{ color: 'white' }} />
          ) : (
            <Image src="/icons/star.png" alt="star" width={15} height={15} />
          )}
          {isSubmitting ? t('CreateTrip.generating') : t('CreateTrip.generate')}
        </Button>
      </Box>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          <p data-testid="error-message">{errorMessage}</p>
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CreateTripForm;
