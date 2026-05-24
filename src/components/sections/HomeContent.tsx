import { SectionScroller } from '@/components/layout/SectionScroller';
import { AutomationApi } from '@/components/sections/AutomationApi';
import { AutomationAuth } from '@/components/sections/AutomationAuth';
import { AutomationChannels } from '@/components/sections/AutomationChannels';
import { AutomationQuickStart } from '@/components/sections/AutomationQuickStart';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { PosterGallery } from '@/components/sections/PosterGallery';
import { RoadmapList } from '@/components/sections/RoadmapList';
import { SecurityStack } from '@/components/sections/SecurityStack';
import { SecurityThreatModel } from '@/components/sections/SecurityThreatModel';
import { TrustList } from '@/components/sections/TrustList';
import { UseCaseDeep } from '@/components/sections/UseCaseDeep';

const trackedHomeSections = [
  { id: 'security', path: '/security' },
  { id: 'use-cases', path: '/use-cases' },
  { id: 'automation', path: '/automation' },
];

export function HomeContent({ initialSection }: { initialSection?: string }) {
  return (
    <>
      <SectionScroller
        section={initialSection}
        defaultPath="/"
        trackedSections={trackedHomeSections}
      />
      <Hero />
      <PosterGallery />
      <FeatureGrid variant="highlight" />
      <SecurityStack />
      <TrustList />
      <SecurityThreatModel />
      <UseCaseDeep />
      <AutomationChannels />
      <AutomationQuickStart />
      <AutomationApi />
      <AutomationAuth />
      <RoadmapList compact />
      <FinalCTA />
    </>
  );
}
