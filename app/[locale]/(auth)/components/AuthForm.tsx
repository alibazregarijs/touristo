'use client';
import { useState, useRef, useTransition } from 'react';
import { AuthFormProps } from '@/types';
import { useInputMaker } from '@/app/[locale]/(auth)/hooks/useInputMaker';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/types/zod';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { SignUpProps } from '@/types/zod';

const AuthForm = ({ page, onSubmit, children }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: zodResolver(signUpSchema), // Use the imported schema
  });

  const onSubmitForm: SubmitHandler<SignUpProps> = (data) => console.log(data);

  const inputFields = useInputMaker({
    setShowPassword,
    showPassword,
    register,
  });

  console.log('register');

  return (
    <Container
      component="main"
      maxWidth="md"
      className="flex min-h-screen items-center justify-center"
    >
      <Paper
        elevation={4}
        className="bg-pink-3 border-pink-2/30 w-full border p-8"
      >
        <Typography
          component="h1"
          align="center"
          className="whitespace-nowrap"
          sx={(theme) => ({
            fontWeight: 'bold',
            mb: 2,
            color: 'var(--white-1)',
            fontSize: {
              xs: theme.typography.h5.fontSize,
              md: theme.typography.h4.fontSize,
            },
          })}
        >
          Create Your Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitForm)}
          className="space-y-3!"
        >
          {inputFields.map((field, index) => {
            if (page === 'sign-in' && field.name !== 'username') {
              return (
                <div key={field.name}>
                  <TextField {...field} {...field.register} key={index} />
                  <div className="mt-1">
                    <p className="text-xl text-red-500">
                      {errors[field.name as keyof SignUpProps]?.message}
                    </p>
                  </div>
                </div>
              );
            }
            if (page === 'sign-up') {
              return (
                <div key={field.name}>
                  <TextField {...field} {...field.register} key={index} />
                  <div className="mt-1">
                    <p className="text-xs text-red-500">
                      {errors[field.name as keyof SignUpProps]?.message}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-pink-2 hover:bg-pink-1 mt-6 py-3 text-base font-semibold"
          >
            {page === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </Button>
          <Divider className="text-white-2 my-6">OR</Divider>
        </Box>
        <Box component="div">{children}</Box>

        <Box className="mt-4 text-center">
          <Typography variant="body2" className="text-white-2">
            {page === 'sign-in'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <a
              href={page === 'sign-in' ? '/signup' : '/login'}
              className="text-pink-2 hover:text-pink-1 font-medium"
            >
              {page === 'sign-in' ? 'Sign up' : 'Sign in'}
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
