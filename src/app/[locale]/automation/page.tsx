import { setRequestLocale } from 'next-intl/server';
import { AutomationApi } from '@/components/sections/AutomationApi';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AutomationApi />;
}
