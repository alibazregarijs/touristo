'use client';
import { useState, useActionState } from 'react';
import { AuthFormProps } from '@/types';
import { useInputMaker } from '@/app/[locale]/(auth)/hooks/useInputMaker';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Google } from '@mui/icons-material';
import { signInWithGoogle } from '@/app/[locale]/(auth)/actions';
import Link from 'next/link';
import { Alert, Snackbar } from '@mui/material';
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
  FieldErrors,
} from 'react-hook-form';
import { type FormFieldProps } from '@/types/index';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const AuthForm = <T extends FieldValues>({
  page,
  onSubmit,
  schema,
}: AuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [_, formAction] = useActionState(signInWithGoogle, null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const t = useTranslations('AuthForm');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm: SubmitHandler<T> = async (data) => {
    setIsFormSubmitting(true);
    const res = await onSubmit(data);
    console.log(res, 'response from onSubmit');
    if (!res.success) {
      setIsFormSubmitting(false);
      setErrorMessage(t(res.error as string) || t('submitionFailed'));
      setShowError(true);
    }
  };

  const inputFields = useInputMaker({
    setShowPassword,
    showPassword,
    register,
  });

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
          <Fields page={page} inputFields={inputFields} errors={errors} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting || isFormSubmitting}
            className="bg-pink-2 hover:bg-pink-1 mt-6 py-3 text-base font-semibold"
          >
            {isSubmitting
              ? page === 'sign-in'
                ? t('signinigIn')
                : t('signingUp')
              : page === 'sign-in'
                ? t('signIn')
                : t('signUp')}
          </Button>
          <Divider className="text-white-2 my-6">{t('devider')}</Divider>
          <LocaleSwitcher />
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
              ? t('dontHaveAnAccount')
              : t('alreadyHaveAnAccount')}
            <Link
              href={page === 'sign-in' ? '/signup' : '/login'}
              className="text-pink-2 hover:text-pink-1 mx-1! font-medium"
            >
              {page === 'sign-in' ? t('signUp') : t('signIn')}
            </Link>
          </Typography>
        </Box>
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
        >
          <Alert severity="error" onClose={() => setShowError(false)}>
            <p data-testid="error-message">{errorMessage}</p>
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

type FieldsProps<T extends FieldValues> = {
  page: 'sign-in' | 'sign-up';
  inputFields: FormFieldProps<T>[];
  errors: FieldErrors<T>;
};

export const Fields = <T extends FieldValues>({
  page,
  inputFields,
  errors,
}: FieldsProps<T>) => {
  const getErrorMessage = (fieldName: string): string | undefined => {
    const error = errors[fieldName as Path<T>];
    return error ? (error as FieldError).message : undefined;
  };
  return (
    <>
      {inputFields.map((field) => {
        const errorMessage = getErrorMessage(field.name);

        if (
          page === 'sign-up' ||
          (page === 'sign-in' && field.name !== 'username')
        ) {
          return (
            <div key={field.name}>
              <TextField {...field} {...field.register} />
              <div className="mt-1">
                <p className="text-xs text-red-500">{errorMessage}</p>
              </div>
            </div>
          );
        }

        return null;
      })}
    </>
  );
};

export default AuthForm;
