'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// ✅ Define the hook
function useUserStatus() {
  const { data: session, status } = useSession();
  const updateUserStatus = useMutation(api.user.updateUserById);
  const user = useQuery(api.user.getUserByEmail, {
    email: session?.user?.email ?? '',
  });

  useEffect(() => {
    if (status === 'loading' || !session || !user) return;

    const updateStatus = (online: boolean) => {
      updateUserStatus({
        userId: session?.user?.id as Id<'users'>,
        online,
      });
    };

    // Initial status update - mark as online
    updateStatus(true);

    // Set up interval to update last seen (only when tab is visible)
    let interval: NodeJS.Timeout;
    const setupInterval = () => {
      interval = setInterval(() => {
        if (!document.hidden) {
          updateStatus(true);
        }
      }, 30000); // every 30s
    };

    setupInterval();

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateStatus(false);
        clearInterval(interval);
      } else {
        updateStatus(true);
        setupInterval();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (session) {
        updateStatus(false);
      }
    };
  }, [session, status, updateUserStatus]);
}

// ✅ Export the hook correctly
export default useUserStatus;
