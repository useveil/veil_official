import { setRequestLocale } from 'next-intl/server';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { OpenSourceCallout } from '@/components/sections/OpenSourceCallout';
import { RoadmapList } from '@/components/sections/RoadmapList';
import { UseCaseGrid } from '@/components/sections/UseCaseGrid';
import { routing, type Locale } from '@/i18n/routing';

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
