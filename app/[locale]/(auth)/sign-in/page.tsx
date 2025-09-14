import React from 'react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import GoogleOauth from '@/app/[locale]/(auth)/components/GoogleOauth';
import { signInWithCredentials } from '@/app/[locale]/(auth)/actions';

const Page = () => {
  return (
    <AuthForm page="sign-in" onSubmit={signInWithCredentials}>
      <GoogleOauth />
    </AuthForm>
  );
};

export default Page;
