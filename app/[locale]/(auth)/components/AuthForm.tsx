'use client';
import { useState, useActionState } from 'react';
import { AuthFormProps } from '@/types';
import { useInputMaker } from '@/app/[locale]/(auth)/hooks/useInputMaker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { Google } from '@mui/icons-material';
import { signInWithGoogle } from '@/app/[locale]/(auth)/actions';
import Link from 'next/link';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FieldError,
  Path,
} from 'react-hook-form';

const AuthForm = <T extends FieldValues>({
  page,
  onSubmit,
  schema,
}: AuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [_, formAction] = useActionState(signInWithGoogle, null);
  const t = useTranslations('AuthForm');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm: SubmitHandler<T> = async (data) => {
    const res = await onSubmit(data);
    console.log(res, 'result in submit');
  };

  const inputFields = useInputMaker({
    setShowPassword,
    showPassword,
    register,
  });

  // Helper function to safely get error message
  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = errors[fieldName as Path<T>];
    return error ? (error as FieldError).message : undefined;
  };

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
          {t('title')}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitForm)}
          className="space-y-3!"
        >
          {inputFields.map((field, index) => {
            const errorMessage = getErrorMessage(field.name);

            if (page === 'sign-in' && field.name !== 'username') {
              return (
                <div key={field.name}>
                  <TextField {...field} {...field.register} key={index} />
                  <div className="mt-1">
                    <p className="text-xl text-red-500">{errorMessage}</p>
                  </div>
                </div>
              );
            }
            if (page === 'sign-up') {
              return (
                <div key={field.name}>
                  <TextField {...field} {...field.register} key={index} />
                  <div className="mt-1">
                    <p className="text-xs text-red-500">{errorMessage}</p>
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

        {/* Google Sign-In */}
        <Box component="div">
          <div className="flex items-center justify-center">
            <form action={formAction}>
              <button type="submit" className="mt-1 cursor-pointer">
                <Google />
              </button>
            </form>
          </div>
        </Box>

        <Box className="mt-4 text-center">
          <Typography variant="body2" className="text-white-2">
            {page === 'sign-in'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <Link
              href={page === 'sign-in' ? '/signup' : '/login'}
              className="text-pink-2 hover:text-pink-1 font-medium"
            >
              {page === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </Typography>
          <LocaleSwitcher />
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
