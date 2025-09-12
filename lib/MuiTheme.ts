import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { inter, fontVazir } from '@/lib/Fonts';

const Inter = inter.variable;
const Vazir = fontVazir.variable;

export const muiCreateTheme = ({
  direction,
}: {
  direction: 'ltr' | 'rtl';
}): Theme => {
  return createTheme({
    direction,
    typography: {
      fontFamily:
        direction === 'ltr'
          ? [Inter, Vazir, 'Arial', 'Helvetica', 'sans-serif'].join(',')
          : [Vazir, Inter, 'Arial', 'Helvetica', 'sans-serif'].join(','),
    },
  });
};
