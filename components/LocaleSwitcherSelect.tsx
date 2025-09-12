'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { Locale, routing, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const params = useParams();

  function onSelectChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value as Locale;

    // Set the cookie to persist the locale choice
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Update the HTML dir attribute immediately for instant visual feedback
    const newDirection = nextLocale === 'en' ? 'ltr' : 'rtl';
    document.documentElement.dir = newDirection;

    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname: '/', params },
      { locale: nextLocale }
    );
  }

  return (
    <FormControl sx={{ minWidth: 80 }} size="small">
      <InputLabel id="locale-select-label">{label}</InputLabel>
      <Select
        labelId="locale-select-label"
        value={defaultValue} // Changed from defaultValue to value for controlled component
        onChange={onSelectChange}
        label={label}
        sx={{
          border: 'none',
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
          height: 32,
        }}
      >
        {routing.locales.map((locale) => (
          <MenuItem key={locale} value={locale}>
            {locale.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
