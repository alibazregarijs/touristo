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
  activeUserToday?: number;
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
  id: Id<'users'>;
  name: string;
  email_address: string;
  date_joined: string;
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
  location: {
    city: string;
    coordinates: [number, number];
  };
  payment_link: string;
  creationTime: number;
}

export interface TripDetailObj {
  id: Id<'trips'>;
  tripDetails: string;
  imageUrls: string[];
}

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveValue = Partial<Record<Breakpoint, number>>;
export type ResponsiveHeight = Partial<Record<Breakpoint, string>>; // e.g., '96px', '207px'

export interface Itinerary {
  title: string;
  description: {
    paragraph: string;
  }[];
}

export interface DaysProps {
  data: Itinerary; // Accept one itinerary object
}

// CreateTripForm.tsx types
export type CountryOption = {
  code: string;
  label: string;
  lat: number;
  lng: number;
};

export type TripFormValues = {
  country: CountryOption;
  groupType: string;
  travelStyle: string;
  interest: string;
  budget: string;
  duration: string;
  userId: string;
  imageUrls: string[];
};

// LatestUserSignups.tsx types
export type LatestUserSignupsType = {
  _id: Id<'users'>;
  _creationTime: number;
  imageUrl?: string;
  email: string;
  username: string;
  lastSeen: number;
  online: boolean;
  countOfItineraryCreated: number;
};

export type UserGrowthType = {
  month: string;
  users: number;
};

export interface UserGrowthChartProps {
  userGrowth: UserGrowthType[];
}

export interface TripGrowth {
  name: string;
  count: number;
  highlight?: boolean;
}

export interface Props<T> {
  lastUser?: boolean;
  item: T[];
}
