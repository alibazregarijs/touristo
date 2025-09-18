'use client';

import { Dispatch, SetStateAction, ReactNode } from 'react';
import { InputAdornment, IconButton, TextFieldVariants } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseFormRegister, Path, FieldValues } from 'react-hook-form';
import { useTranslations } from 'next-intl';

export type FormFieldProps<T extends FieldValues> = {
  required?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  name: Path<T>;
  autoComplete?: string;
  autoFocus?: boolean;
  variant?: TextFieldVariants;
  className?: string;
  type?: string;
  InputProps?: {
    className?: string;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    className?: string;
  };
  register: ReturnType<UseFormRegister<T>>;
};

export const useInputMaker = <T extends FieldValues>({
  setShowPassword,
  showPassword,
  register,
}: {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
  register: UseFormRegister<T>;
}): FormFieldProps<T>[] => {
  const t = useTranslations('AuthForm');
  return [
    {
      required: true,
      fullWidth: true,
      id: 'username',
      label: t('inputFields.username'),
      name: 'username' as Path<T>,
      autoComplete: 'username',
      autoFocus: true,
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      inputProps: { className: 'text-white-1' },
      register: register('username' as Path<T>),
    },
    {
      required: true,
      fullWidth: true,
      id: 'email',
      label: t('inputFields.email'),
      name: 'email' as Path<T>,
      autoComplete: 'email',
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      inputProps: { className: 'text-white-1' },
      register: register('email' as Path<T>),
    },
    {
      required: true,
      fullWidth: true,
      id: 'password',
      name: 'password' as Path<T>,
      label: t('inputFields.password'),
      autoComplete: 'new-password',
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      type: showPassword ? 'text' : 'password',
      InputProps: {
        className: 'text-white-1',
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              className="text-white-2"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
      inputProps: { className: 'text-white-1' },
      register: register('password' as Path<T>),
    },
  ];
};
