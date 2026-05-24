import { HomeContent } from '@/components/sections/HomeContent';
import { type Locale, routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'useCases', path: '/use-cases' });
}

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

  return <HomeContent initialSection="use-cases" />;
}
