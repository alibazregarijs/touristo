export type AuthActionStateFn = (
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
) => Promise<{ success: boolean; error: any } | { success: boolean }>;

// auth form props type
export type AuthFormProps = {
  page: 'sign-in' | 'sign-up';
  onSubmit: AuthActionStateFn;
  schema: SignInSchemaProps[];
  callbackUrl: string;
  children: React.ReactNode;
};
