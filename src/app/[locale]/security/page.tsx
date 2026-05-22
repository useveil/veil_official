import { setRequestLocale } from 'next-intl/server';
import { SecurityStack } from '@/components/sections/SecurityStack';
import { SecurityThreatModel } from '@/components/sections/SecurityThreatModel';
import { TrustList } from '@/components/sections/TrustList';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SecurityStack />
      <TrustList />
      <SecurityThreatModel />
    </>
  );
}
