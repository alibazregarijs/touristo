'use client';

import { useSession } from 'next-auth/react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

export default function StoreOAuthUser() {
  const { data: session, status } = useSession();
  const storeOAuthUser = useMutation(api.user.storeOAuthUser);

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user?.email &&
      session.user.name
    ) {
      storeOAuthUser({
        email: session.user.email,
        imageUrl: session.user.image || '',
        username: session.user.name,
      });
    }
  }, [status, session, storeOAuthUser]);

  return null; // This component doesn't render anything
}
