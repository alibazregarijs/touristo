import React from 'react';
import StoreOAuthUser from '@/app/[locale]/(auth)/components/StoreOAuthUser';

const Page = () => {
  return (
    <div>
      <StoreOAuthUser />
      page after auth
    </div>
  );
};

export default Page;
