import React from 'react';
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
};

export default Page;
