import { LegalDocument } from '@/components/sections/LegalDocument';
import { getLocalizedText } from '@/content/features';
import { legalDocuments } from '@/content/legal';
import { type Locale, routing } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

const document = legalDocuments.team;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    locale,
    namespace: 'common',
    path: document.path,
    titleOverride: getLocalizedText(document.title, locale),
    descriptionOverride: getLocalizedText(document.description, locale),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalDocument documentKey="team" />;
}
