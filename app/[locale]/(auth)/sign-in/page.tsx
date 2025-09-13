import React from 'react';
import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const Page = async () => {
  const t = await getTranslations('HomePage');
  return (
    <div>
      {' '}
      <h1 className="font-vazir">{t('title')}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export default Page;
