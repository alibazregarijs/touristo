import React from 'react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import GoogleOauth from '@/app/[locale]/(auth)/components/GoogleOauth';
import { signUpAction } from '@/app/[locale]/(auth)/actions';

const Page = () => {
  return (
    <AuthForm page="sign-up" onSubmit={signUpAction}>
      <GoogleOauth />
    </AuthForm>
  );
};

export default Page;
