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
