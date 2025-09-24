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
