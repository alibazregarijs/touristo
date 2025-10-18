import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useFilter } from '@/contexts/UserFilterProvider';
import type { FilterOption } from '@/contexts/UserFilterProvider';
import { useTranslations } from 'next-intl';

const TITLES = [
  'NAME',
  'EMAIL ADDRESS',
  'DATE JOINED',
  'ITINERARY CREATED',
  'STATUS',
];

const UserListHeader = () => {
  const t = useTranslations();
  const { setSort } = useFilter();
  const setFilter = (value: FilterOption) => {
    setSort({ sortOrder: 'asc', sortOption: value });
  };
  return (
    <Grid container spacing={2} p={2} sx={{ mb: 2 }}>
      {TITLES.map((title) => {
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={title}>
            <Typography
              fontWeight={600}
              fontSize="12px"
              color="text.secondary"
              noWrap
              className="cursor-pointer"
              onClick={() => setFilter(title as FilterOption)}
              sx={{
                display: 'inline-block', // 👈 shrink to text
                px: 0.5, // optional padding
              }}
            >
              {t(`AllUser.${title}`)}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserListHeader;
