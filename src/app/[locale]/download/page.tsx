import { setRequestLocale } from 'next-intl/server';
import { DownloadGrid } from '@/components/sections/DownloadGrid';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DownloadGrid />;
}
