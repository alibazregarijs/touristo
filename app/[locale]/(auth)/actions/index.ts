'use server';

import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

interface AuthCredentials {
  email: string;
  password: string;
  username: string;
}

export const signUpAction = async (params: AuthCredentials) => {
  const { email, password, username } = params;

  const hashedPassword = await hash(password, 10);

  const result = await fetchMutation(api.user.createUserIfNotExists, {
    email,
    username,
    password: hashedPassword,
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  redirect('/en/sign-in');
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { success: false, error: result.error };
  }
  redirect('/en');
};

export const signInWithGoogle = async () => {
  await signIn('google');
};
