import { setRequestLocale } from 'next-intl/server';
import { UseCaseDeep } from '@/components/sections/UseCaseDeep';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <UseCaseDeep />;
}
