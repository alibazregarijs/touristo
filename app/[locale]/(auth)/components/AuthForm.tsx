'use client';
import { useActionState, useState, useRef, useEffect } from 'react';
import { AuthFormProps } from '@/types';
import { useInputMaker } from '@/app/[locale]/(auth)/hooks/useInputMaker';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const AuthForm = ({ page, onSubmit, children }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fix the onSubmit handler signature
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await onSubmit(formData);
  };

  const inputFields = useInputMaker({
    formData,
    handleChange,
    setShowPassword,
    showPassword,
  });

  return (
    <Container
      component="main"
      maxWidth="sm"
      className="flex max-h-screen items-center justify-center py-8"
    >
      <Paper
        elevation={8}
        className="bg-pink-3 border-pink-2/30 w-full border p-8"
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className="text-white-1 mb-6 font-bold"
        >
          Create Your Account
        </Typography>

        {/* Remove the data parameter from handleSubmit */}
        <Box component="form" onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field, index) => {
            if (page === 'sign-in' && field.name !== 'username') {
              return <TextField {...field} key={index} />;
            }
            if (page === 'sign-up') {
              return <TextField {...field} key={index} />;
            }
            return null; // Add return null for cases that don't match
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
