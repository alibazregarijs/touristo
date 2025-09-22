'use server';

import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { type AuthCredentials } from '@/types/index';
import { compare } from 'bcryptjs';
import { convex } from '@/lib/Convex';

export const signUpAction = async (params: AuthCredentials) => {
  const { email, password, username } = params;

  try {
    const hashedPassword = await hash(password, 10);

    const result = await fetchMutation(api.user.createUserIfNotExists, {
      email,
      username,
      password: hashedPassword,
    });

    if (!result.success) {
      // Pass through backend-defined error key
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Sign-up error:', error);
    return { success: false, error: 'serverError' };
  }
  redirect('/en/sign-in');
};

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = params;

  // Validate input
  if (!email || !password) {
    return { success: false, error: 'missingCredentials' };
  }

  try {
    // First, manually check the credentials to get specific error messages
    const user = await convex.query(api.user.getUserByEmail, {
      email: email.toString(),
    });

    if (!user) {
      return { success: false, error: 'signInUserExistError' };
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await compare(password.toString(), user.password);

    if (!isPasswordValid) {
      return { success: false, error: 'invalidErrorPassword' };
    }

    // If validation passes, use NextAuth to create the session
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: 'submitionFailed' };
    }

    // Successful sign-in
  } catch (error) {
    console.error('Sign-in error:', error);
    return { success: false, error: 'serverError' };
  }
  return redirect('/en');
};

export const signInWithGoogle = async () => {
  await signIn('google');
};
