'use client';
import React from 'react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import { signUpAction } from '@/app/[locale]/(auth)/actions';
import { signUpSchema } from '@/types/zod';

const Page = () => {
  return (
    <AuthForm page="sign-up" onSubmit={signUpAction} schema={signUpSchema} />
  );
};

export default Page;
