import { ChangelogList } from '@/components/sections/ChangelogList';
import { type Locale, routing } from '@/i18n/routing';
import { getAllChangelogs } from '@/lib/changelog';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, namespace: 'changelog', path: '/changelog' });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entries = await getAllChangelogs();
  return <ChangelogList entries={entries} />;
}
