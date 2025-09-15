import { Dispatch, SetStateAction } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ChangeEvent, ReactNode } from 'react';
import { TextFieldVariants } from '@mui/material';

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
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  InputProps?: {
    // <-- instead of slotProps
    className?: string;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    // <-- instead of htmlInput
    className?: string;
  };
};

export type SignUpSchemaProps = FormFieldProps[];

export const useInputMaker = ({
  formData,
  handleChange,
  setShowPassword,
  showPassword,
}: {
  formData: FormDataProps;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showPassword: boolean;
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
      value: formData.username,
      onChange: handleChange,
      inputProps: { className: 'text-white-1' },
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
      value: formData.email,
      onChange: handleChange,
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
      type: showPassword ? 'text' : 'password',
      value: formData.password,
      onChange: handleChange,
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
