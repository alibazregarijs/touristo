import React from 'react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import { signIn } from '@/auth';
import { signUpAction } from '@/app/[locale]/(auth)/actions';

const Page = () => {
  return (
    <AuthForm page="sign-up" onSubmit={signUpAction}>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </AuthForm>
  );
};

export default Page;
