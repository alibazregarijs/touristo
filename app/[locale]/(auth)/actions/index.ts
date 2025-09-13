'use server';

import { fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

export const signUpAction = async (
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) => {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

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
