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

// TripsCard data
export const tripsObj = [
  {
    title: 'Thornridge Cir. Shiloh',
    location: 'St George’s Ln Singapore',
    buttons: ['Mountains', 'City'],
    image: '/images/trip-1.png',
    href: '/en/AI-trips/Thornridge Cir. Shiloh',
    lat: 38.575,
    lng: -89.935,
  },
  {
    title: 'Roraima Tepui',
    location: 'Canaima Park, Venezuela',
    buttons: ['Solo travel', 'Budget'],
    image: '/images/trip-2.png',
    href: '/en/AI-trips/Roraima Tepui',
    lat: 5.1667,
    lng: -60.7667,
  },
  {
    title: 'Socotra Island',
    location: 'Yemen',
    buttons: ['Luxury', 'Beach'],
    image: '/images/trip-3.png',
    href: '/en/AI-trips/Socotra Island',
    lat: 12.5,
    lng: 53.5,
  },
  {
    title: 'San Lake Baikal',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal2',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal2',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal3',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal3',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal4',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal4',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal5',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal5',
    lat: 53.5,
    lng: 108.0,
  },

  {
    title: 'San Lake Baikal12',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal12',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal13',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal13',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal14',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal14',
    lat: 53.5,
    lng: 108.0,
  },
  {
    title: 'San Lake Baikal15',
    location: 'Siberia, Russia',
    buttons: ['Sports', 'Adventurous'],
    image: '/images/trip-4.png',
    href: '/en/AI-trips/San Lake Baikal15',
    lat: 53.5,
    lng: 108.0,
  },
];

// days data

export const itineraryData = [
  {
    title: 'Day 1: Arrival in Tokyo & Shibuya Exploration',
    description: [
      {
        paragraph: 'Arrive at Narita/Haneda Airport & check-in at hotel',
      },
      {
        paragraph: 'Visit Shibuya Crossing & Hachiko Statue',
      },
      {
        paragraph:
          'Explore Shinjuku for city views at Tokyo Metropolitan Govt. Building',
      },
      {
        paragraph: 'Dinner at an Izakaya in Golden Gai',
      },
    ],
  },

  {
    title: 'Day 2: Tokyo Sightseeing & Culture',
    description: [
      {
        paragraph: 'Morning: Senso-ji Temple in Asakusa',
      },
      {
        paragraph: 'Afternoon: Akihabara (tech & anime district)',
      },
      {
        paragraph: 'Evening: Walk around Tokyo Tower & Roppongi',
      },
    ],
  },
  {
    title: 'Day 3: Day Trip to Hakone (Mt. Fuji Views)',
    description: [
      {
        paragraph: 'Take the Hakone Ropeway for a scenic view',
      },
      {
        paragraph: 'Relax in an onsen (hot spring)',
      },
      {
        paragraph: 'Visit Lake Ashi & see Fuji in the distance',
      },
    ],
  },
];

export const bestTimeVisitData = [
  {
    title: 'Best Time to Visit:',
    description: [
      {
        paragraph:
          '🌸 Spring (March–May): Cherry blossoms in full bloom, mild temperatures.',
      },
      {
        paragraph:
          '🍁 Autumn (September–November): Beautiful fall foliage, comfortable weather.',
      },
      {
        paragraph:
          '❄ Winter (December–February): Quieter, with snow-covered temples creating a magical scene.',
      },
      {
        paragraph:
          '☀ Summer (June–August): Hot & humid but lively with festivals like Gion Matsuri.',
      },
    ],
  },
];

export const weatherData = [
  {
    title: 'Weather Info:',
    description: [
      {
        paragraph: 'Spring: 10°C – 20°C (50°F – 68°F)',
      },
      {
        paragraph: 'Summer: 22°C – 33°C (72°F – 91°F)',
      },
      {
        paragraph: 'Autumn: 12°C – 25°C (54°F – 77°F)',
      },
      {
        paragraph: 'Winter: 0°C – 10°C (32°F – 50°F)',
      },
    ],
  },
];

export const popularTrips = [
  {
    title: 'Thornridge Cir. Shiloh',
    location: 'St George’s Ln Singapore',
    buttons: ['Mountains', 'City'],
    image: '/images/trip-1.png',
    href: '/en/AI-trips/Thornridge Cir. Shiloh',
    lat: 38.575,
    lng: -89.935,
  },
  {
    title: 'Roraima Tepui',
    location: 'Canaima Park, Venezuela',
    buttons: ['Solo travel', 'Budget'],
    image: '/images/trip-2.png',
    href: '/en/AI-trips/Roraima Tepui',
    lat: 5.1667,
    lng: -60.7667,
  },
  {
    title: 'Roraima Tepuiy',
    location: 'Canaima Park, Venezuela',
    buttons: ['Solo travel', 'Budget'],
    image: '/images/trip-2.png',
    href: '/en/AI-trips/Roraima Tepui',
    lat: 5.1667,
    lng: -60.7667,
  },
];

export const BUTTONS = ['Luxury', 'Beach', 'Mountain', 'Budget'];

export const COLORS_BUDGET = [
  {
    type: 'RELAXED',
    bg: '#F7EDF6',
    color: '#C11574',
  },
  {
    type: 'Nature & Outdoors',
    bg: '#E9F3FB',
    color: '#175CD3',
  },
  {
    type: 'City Exploration',
    bg: '#ECFDF3',
    color: '#027A48',
  },
  {
    type: 'Adventure',
    bg: '#FFF1F3',
    color: '#C01048',
  },
  {
    type: 'Cultural',
    bg: '#FFF4ED',
    color: '#B93815',
  },
  {
    type: 'Relaxation',
    bg: '#F0F9FF',
    color: '#026AA2',
  },

  // 💰 Budget tiers with distinct palette
  {
    type: 'Mid-Range',
    bg: '#FFF7E6', // warm amber background
    color: '#B54708', // deep orange text
  },
  {
    type: 'Luxury',
    bg: '#F3F0FF', // soft lavender background
    color: '#6941C6', // royal purple text
  },
  {
    type: 'Premium',
    bg: '#E6FFFA', // aqua background
    color: '#0F766E', // teal text
  },
  {
    type: 'Budget',
    bg: '#FFF0F6', // light pink background
    color: '#C11574', // magenta text
  },
];
