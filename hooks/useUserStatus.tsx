// app/components/UserStatus.tsx
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const UserStatus = () => {
  const { data: session, status } = useSession();
  const updateLastSeen = useMutation(api.user.updateLastSeen);
  const user = useQuery(api.user.getUserById, {
    userId: session?.user?.id as Id<'users'>,
  });

  useEffect(() => {
    if (!session?.user?.id || !user) return;

    const userId = session.user.id as Id<'users'>;

    // Function to ping server
    const tick = () => {
      updateLastSeen({ userId });
    };

    // Initial ping
    tick();

    // Refresh every 30s
    const interval = setInterval(tick, 30_000);

    // Cleanup
    return () => clearInterval(interval);
  }, [session, status, updateLastSeen]);

  return null; // invisible component
};

export default UserStatus;
