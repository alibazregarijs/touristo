// auth form props type
export type AuthFormProps<T extends FieldValues> = {
  page: 'sign-in' | 'sign-up';
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  schema: ZodType<T>;
};
