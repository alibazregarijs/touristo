import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CheckUserAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user?.email &&
      session.user.name
    ) {
      router.push('/en');
    }
  }, [status, session, router]);
};

export default CheckUserAuth;
