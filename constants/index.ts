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
