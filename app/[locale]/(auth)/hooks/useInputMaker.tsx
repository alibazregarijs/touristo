'use client';

import { Dispatch, SetStateAction } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ChangeEvent, ReactNode } from 'react';
import { TextFieldVariants } from '@mui/material';
import { SignUpProps } from '@/types/zod';
import { UseFormRegisterReturn, UseFormRegister } from 'react-hook-form';

export type FormDataProps = {
  username: string;
  email: string;
  password: string;
};

export type FormFieldProps = {
  required?: boolean; // <-- boolean
  fullWidth?: boolean; // <-- boolean
  id: string;
  label: string;
  name: string;
  autoComplete?: string;
  autoFocus?: boolean; // <-- boolean
  variant?: TextFieldVariants; // <-- 'outlined' | 'filled' | 'standard'
  className?: string;
  type?: string;
  InputProps?: {
    // <-- instead of slotProps
    className?: string;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    // <-- instead of htmlInput
    className?: string;
  };
  register: ReturnType<UseFormRegister<SignUpProps>>;
};

export type SignUpSchemaProps = FormFieldProps[];

export const useInputMaker = ({
  setShowPassword,
  showPassword,
  register,
}: {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
  register: UseFormRegister<SignUpProps>; // ✅ FIXED
}): SignUpSchemaProps => {
  return [
    {
      required: true,
      fullWidth: true,
      id: 'username',
      label: 'Username',
      name: 'username',
      autoComplete: 'username',
      autoFocus: true,
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      inputProps: { className: 'text-white-1' },
      register: register('username'),
    },
    {
      required: true,
      fullWidth: true,
      id: 'email',
      label: 'Email Address',
      name: 'email',
      autoComplete: 'email',
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      register: register('email'),
      inputProps: { className: 'text-white-1' },
    },
    {
      required: true,
      fullWidth: true,
      name: 'password',
      label: 'Password',
      id: 'password',
      autoComplete: 'new-password',
      variant: 'outlined',
      className: 'bg-black-1 rounded-lg',
      register: register('password'),
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
    },
  ];
};
