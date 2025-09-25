// auth form props type
export type AuthFormProps<T extends FieldValues> = {
  page: 'sign-in' | 'sign-up';
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  schema: ZodType<T>;
};

interface AuthCredentials {
  email: string;
  password: string;
  username: string;
}

export type FormFieldProps<T extends FieldValues> = {
  required?: boolean;
  fullWidth?: boolean;
  id: string;
  label: string;
  name: Path<T>;
  autoComplete?: string;
  autoFocus?: boolean;
  variant?: TextFieldVariants;
  className?: string;
  type?: string;
  InputProps?: {
    className?: string;
    endAdornment?: ReactNode;
  };
  inputProps?: {
    className?: string;
  };
  register: ReturnType<UseFormRegister<T>>;
};

// Users card props type
export type State = (typeof STATES)[keyof typeof STATES];

export interface UsersCardProps {
  state: State;
  data: number[];
}

// Trips card props type
type TripT = {
  title: string;
  location: string;
  buttons: string[];
  image: string;
};
