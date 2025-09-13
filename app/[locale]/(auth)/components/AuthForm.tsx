import react from 'react';
import { AuthFormProps } from '@/types';
import { useInputMaker } from '@/app/[locale]/(auth)/hooks/useInputMaker';
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff, GitHub, Google } from '@mui/icons-material';

const AuthForm = ({ page, schema, onSubmit, children }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Form submitted:', formData);
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

        <Box component="form" onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field, index) => (
            <TextField {...field} key={index} />
          ))}
          {/* <TextField
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            className="bg-black-1 rounded-lg"
            slotProps={{
              input: {
                className: 'text-white-1',
              },
              htmlInput: {
                className: 'text-white-1',
              },
            }}
          />

          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            className="bg-black-1 rounded-lg"
            slotProps={{
              input: {
                className: 'text-white-1',
              },
              htmlInput: {
                className: 'text-white-1',
              },
            }}
          />

          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            className="bg-black-1 rounded-lg"
            slotProps={{
              input: {
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
              htmlInput: {
                className: 'text-white-1',
              },
            }}
          /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-pink-2 hover:bg-pink-1 mt-6 py-3 text-base font-semibold"
          >
            Sign Up
          </Button>

          <Divider className="text-white-2 my-6">OR</Divider>

          <Box className="flex flex-col space-y-3">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              className="text-white-1 border-white-2 hover:border-pink-2 hover:text-pink-2 py-2"
            >
              Sign up with Google
            </Button>
          </Box>

          <Box className="mt-4 text-center">
            <Typography variant="body2" className="text-white-2">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-pink-2 hover:text-pink-1 font-medium"
              >
                Sign in
              </a>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthForm;
