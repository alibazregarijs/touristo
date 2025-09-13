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

  return (
    <FormControl size="small" variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={defaultValue}
        label={label}
        onChange={onSelectChange}
        sx={{
          minWidth: 80,
          height: 32,
          border: 'none',
          background: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': { border: 0 },
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
