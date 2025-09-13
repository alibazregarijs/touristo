import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import SignIn from '@/components/SignIn';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
    <div>
      <h1 className="font-vazir">{t('title')}</h1>
      <h1 className="font-inter">{t('title')}</h1>
      <hr />
      <div className="mt-4">
        <LocaleSwitcher />
      </div>
      <div>
        <SignIn />
      </div>
    </div>
  );
}
