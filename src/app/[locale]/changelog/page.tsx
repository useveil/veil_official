import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ChangelogList } from '@/components/sections/ChangelogList';
import { getAllChangelogs } from '@/lib/changelog';
import { routing, type Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';

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
