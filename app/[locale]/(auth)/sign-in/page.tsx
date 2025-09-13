import React from 'react';
import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const Page = async () => {
  const t = await getTranslations('HomePage');
  return <div>sign in</div>;
};

export default Page;
