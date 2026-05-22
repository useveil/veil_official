import { setRequestLocale } from 'next-intl/server';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ComparisonTable />;
}
