'use client';

import { z } from 'zod';
import { useTranslations } from 'next-intl';

export function useSchemas() {
  const t = useTranslations('AuthForm');

  const signInSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('zodError.emailRequired') })
      .email({ message: t('zodError.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('zodError.passwordRequired') })
      .min(6, { message: t('zodError.passwordMinLength') }),
  });

  const signUpSchema = z.object({
    username: z
      .string()
      .min(1, { message: t('zodError.usernameRequired') })
      .min(3, { message: t('zodError.usernameMinLength') })
      .max(20, { message: t('zodError.usernameMaxLength') }),
    email: z
      .string()
      .min(1, { message: t('zodError.emailRequired') })
      .email({ message: t('zodError.emailInvalid') }),
    password: z
      .string()
      .min(1, { message: t('zodError.passwordRequired') })
      .min(6, { message: t('zodError.passwordMinLength') }),
  });

  return { signInSchema, signUpSchema };
}
