// auth form props type
export type AuthFormProps = {
  page: 'sign-in' | 'sign-up';
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  children: React.ReactNode;
};
