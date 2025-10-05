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
  href: string;
  lat: number;
  lng: number;
};

// User info type
export interface UserInfoI {
  name: string;
  email_address: string;
  data_joined: string;
  itinerary_created: string;
  status: string;
  image: string;
}

// Trip info type
declare interface Trip {
  id: string;
  name: string;
  description: string;
  estimatedPrice: string;
  duration: number;
  budget: string;
  travelStyle: string;
  interests: string;
  groupType: string;
  country: string;
  imageUrls: string[];
  itinerary: DayPlan[];
  bestTimeToVisit: string[];
  weatherInfo: string[];
  location: Location;
  payment_link: string;
}

export interface tripDetailsObj {
  id: Id<'trips'>;
  tripDetails: string;
  imageUrls: string[];
}
