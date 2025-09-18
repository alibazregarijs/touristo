'use client';
import React from 'react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import { signInWithCredentials } from '@/app/[locale]/(auth)/actions';
import { signInSchema } from '@/types/zod';
const Page = () => {
  return (
    <AuthForm
      page="sign-in"
      onSubmit={signInWithCredentials}
      schema={signInSchema}
    ></AuthForm>
  );
};

export default Page;
