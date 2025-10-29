'use client';

import { useParams } from 'next/navigation';
import { Locale, routing, usePathname, useRouter } from '@/i18n/routing';
import { ReactNode } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

type Props = {
  children?: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: SelectChangeEvent<string>) {
    const nextLocale = event.target.value;
    router.replace(
      // @ts-expect-error -- skipping runtime checks as before
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  }

  // unique ids for accessibility
  const labelId = 'locale-switcher-label';
  const selectId = 'locale-switcher-select';

  return (
    <FormControl size="small" variant="outlined">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        id={selectId}
        name="locale" // ✅ gives the hidden input a name
        labelId={labelId} // ✅ ties label to select
        value={defaultValue}
        label={label}
        onChange={onSelectChange}
        sx={{
          minWidth: 120,
          height: 32,
          background: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => theme.palette.primary.main,
            borderWidth: 2,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => theme.palette.primary.main,
          },
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
