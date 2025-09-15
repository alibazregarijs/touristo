import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import SignIn from '@/components/SignIn';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return <div></div>;
}
