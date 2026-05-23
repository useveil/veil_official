import { AutomationApi } from '@/components/sections/AutomationApi';
import { AutomationAuth } from '@/components/sections/AutomationAuth';
import { AutomationChannels } from '@/components/sections/AutomationChannels';
import { AutomationQuickStart } from '@/components/sections/AutomationQuickStart';
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
  return buildPageMetadata({ locale, namespace: 'automation', path: '/automation' });
}

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

  return (
    <>
      <AutomationChannels />
      <AutomationQuickStart />
      <AutomationApi />
      <AutomationAuth />
    </>
  );
}
