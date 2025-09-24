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
          ? [
              'var(--font-inter)',
              'var(--font-vazir)',
              'Arial',
              'Helvetica',
              'sans-serif',
            ].join(',')
          : [
              'var(--font-vazir)',
              'var(--font-inter)',
              'Arial',
              'Helvetica',
              'sans-serif',
            ].join(','),
    },
    palette: {
      primary: {
        light: '#fd366e', // pink-2
        main: '#70243c', // pink-1
        dark: '#2c1b24', // pink-3
      },
      background: {
        default: '#19191c', // black-1
        paper: '#2c1b24', // pink-3
      },
      text: {
        primary: '#c3c3c6', // white-1
        secondary: '#a0a0a4', // white-2
      },
    },
  });
};
