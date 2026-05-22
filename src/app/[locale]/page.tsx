import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { OpenSourceCallout } from '@/components/sections/OpenSourceCallout';
import { RoadmapList } from '@/components/sections/RoadmapList';
import { UseCaseGrid } from '@/components/sections/UseCaseGrid';
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
  return buildPageMetadata({ locale, namespace: 'home.hero', path: '/' });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeatureGrid variant="highlight" />
      <UseCaseGrid />
      <RoadmapList compact />
      <OpenSourceCallout />
      <FinalCTA />
    </>
  );
}
