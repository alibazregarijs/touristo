import Link from 'next/link';
import StoreOAuthUser from '@/app/[locale]/(auth)/components/StoreOAuthUser';

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      {/* <StoreOAuthUser /> */}
    </div>
  );
}
