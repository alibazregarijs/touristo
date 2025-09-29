import { State } from '@/types';

export const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/en',
    icon: '/icons/home.png',
    icon_hover: '/icons/home-hover.png',
  },

  {
    name: 'All Users',
    href: '/en/all-user',
    icon: '/icons/profile-2user.png',
    icon_hover: '/icons/profile-2user-hover.png',
  },
  {
    name: 'AI Trips',
    href: '/en/AI-trips',
    icon: '/icons/map.png',
    icon_hover: '/icons/map-hover.png',
  },
];

export const STATES = {
  TOTAL_USER: 'total_user',
  TOTAL_TRIPS: 'total_trips',
  ACTIVE_USERS_TODAY: 'active_users_today',
} as const;

export const STATE_LABELS: Record<State, string> = {
  total_user: 'Users',
  total_trips: 'Trips',
  active_users_today: 'Active Users Today',
};

export const userData = [
  {
    name: 'James Anderson',
    itineraryCreated: '12',
    image: '/images/user-1.png',
  },
  {
    name: 'James Alexander',
    itineraryCreated: '6',
    image: '/images/user-2.png',
  },
  {
    name: 'Hana Anderson',
    itineraryCreated: '6',
    image: '/images/user-3.png',
  },
  {
    name: 'Awadhi Thomas',
    itineraryCreated: '16',
    image: '/images/user-4.png',
  },
];

export const tripData = [
  {
    name: 'James Anderson',
    itineraryCreated: 'Jun 02 - Jun 12',
    image: '/images/trip-1.png',
  },
  {
    name: 'James Alexander',
    itineraryCreated: 'Jun 07 - Jun 09',
    image: '/images/trip-2.png',
  },
  {
    name: 'Hana Anderson',
    itineraryCreated: 'Jun 10 - Jun 23',
    image: '/images/trip-3.png',
  },
  {
    name: 'Awadhi Thomas',
    itineraryCreated: 'Jun 12 - Jun 26',
    image: '/images/trip-4.png',
  },
];

// UserListManager data
export const USER_INFO = [
  {
    name: 'John Doe',
    email_address: 'johndoe@example.com',
    data_joined: '2022-01-01',
    itinerary_created: '10',
    status: 'user',
    image: '/images/user-profile.png',
  },
  {
    name: 'Jane Smith',
    email_address: 'janesmith@example.com',
    data_joined: '2022-02-15',
    itinerary_created: '05',
    status: 'admin',
    image: '/images/user-profile.png',
  },
  {
    name: 'Ali Reza',
    email_address: 'ali.reza@example.com',
    data_joined: '2022-03-10',
    itinerary_created: '07',
    status: 'user',
    image: '/images/user-profile.png',
  },
  {
    name: 'Maria Garcia',
    email_address: 'maria.garcia@example.com',
    data_joined: '2022-04-05',
    itinerary_created: '12',
    status: 'user',
    image: '/images/user-profile.png',
  },
  {
    name: 'David Kim',
    email_address: 'david.kim@example.com',
    data_joined: '2022-05-20',
    itinerary_created: '03',
    status: 'admin',
    image: '/images/user-profile.png',
  },
  {
    name: 'Sophia Lee',
    email_address: 'sophia.lee@example.com',
    data_joined: '2022-06-18',
    itinerary_created: '08',
    status: 'user',
    image: '/images/user-profile.png',
  },
  {
    name: 'Michael Brown',
    email_address: 'michael.brown@example.com',
    data_joined: '2022-07-22',
    itinerary_created: '15',
    status: 'admin',
    image: '/images/user-profile.png',
  },
  {
    name: 'Emma Wilson',
    email_address: 'emma.wilson@example.com',
    data_joined: '2022-08-30',
    itinerary_created: '06',
    status: 'user',
    image: '/images/user-profile.png',
  },
];

// CreateTripForm data
export const COUNTRIES = [
  { code: 'IR', label: 'Iran', lat: 32.4279, lng: 53.688 },
  { code: 'US', label: 'United States', lat: 37.0902, lng: -95.7129 },
  { code: 'BE', label: 'Belgium', lat: 50.8503, lng: 4.3517 },
  { code: 'FR', label: 'France', lat: 46.6034, lng: 1.8883 },
  { code: 'JP', label: 'Japan', lat: 36.2048, lng: 138.2529 },
  { code: 'BR', label: 'Brazil', lat: -14.235, lng: -51.9253 },
  { code: 'IN', label: 'India', lat: 20.5937, lng: 78.9629 },
  { code: 'AU', label: 'Australia', lat: -25.2744, lng: 133.7751 },
  { code: 'CA', label: 'Canada', lat: 56.1304, lng: -106.3468 },
  { code: 'CN', label: 'China', lat: 35.8617, lng: 104.1954 },
  { code: 'DE', label: 'Germany', lat: 51.1657, lng: 10.4515 },
  { code: 'ES', label: 'Spain', lat: 40.4637, lng: -3.7492 },
  { code: 'IT', label: 'Italy', lat: 41.8719, lng: 12.5674 },
  { code: 'NL', label: 'Netherlands', lat: 52.1326, lng: 5.2913 },
  { code: 'RU', label: 'Russia', lat: 61.524, lng: 105.3188 },
  { code: 'ZA', label: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { code: 'GB', label: 'United Kingdom', lat: 55.3781, lng: -3.436 },
  { code: 'MX', label: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { code: 'AR', label: 'Argentina', lat: -38.4161, lng: -63.6167 },
  { code: 'CL', label: 'Chile', lat: -35.6751, lng: -71.543 },
  { code: 'CO', label: 'Colombia', lat: 4.5709, lng: -74.2973 },
  { code: 'CR', label: 'Costa Rica', lat: 9.7489, lng: -83.7534 },
  { code: 'EC', label: 'Ecuador', lat: -1.8312, lng: -78.1834 },
  { code: 'SV', label: 'El Salvador', lat: 13.7942, lng: -88.8965 },
  { code: 'GT', label: 'Guatemala', lat: 15.7835, lng: -90.2308 },
  { code: 'HN', label: 'Honduras', lat: 13.2, lng: -85.0 },
  { code: 'NI', label: 'Nicaragua', lat: 12.8654, lng: -85.2072 },
  { code: 'PA', label: 'Panama', lat: 8.538, lng: -80.7821 },
  { code: 'PY', label: 'Paraguay', lat: -23.4425, lng: -58.4438 },
  { code: 'PE', label: 'Peru', lat: -9.19, lng: -75.0152 },
  { code: 'PR', label: 'Puerto Rico', lat: 18.2208, lng: -66.5901 },
  { code: 'DO', label: 'Dominican Republic', lat: 18.7357, lng: -70.1627 },
  { code: 'UY', label: 'Uruguay', lat: -32.5228, lng: -55.7658 },
];
