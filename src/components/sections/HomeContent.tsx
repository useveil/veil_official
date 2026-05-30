import { SectionScroller } from '@/components/layout/SectionScroller';
import { AutomationAuth } from '@/components/sections/AutomationAuth';
import { AutomationIntegration } from '@/components/sections/AutomationIntegration';
import { DataOwnershipSection } from '@/components/sections/DataOwnershipSection';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { HomeFaqSection } from '@/components/sections/HomeFaqSection';
import { IndustryTrustSection } from '@/components/sections/IndustryTrustSection';
import { ProfileWorkflowSection } from '@/components/sections/ProfileWorkflowSection';
import { RoadmapList } from '@/components/sections/RoadmapList';
import { SecurityStack } from '@/components/sections/SecurityStack';
import { SecurityThreatModel } from '@/components/sections/SecurityThreatModel';
import { TrustList } from '@/components/sections/TrustList';

const trackedHomeSections = [
  { id: 'use-cases', path: '/use-cases' },
  { id: 'security', path: '/security' },
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
      <FeatureGrid variant="highlight" />
      <DataOwnershipSection />
      <IndustryTrustSection />
      <ProfileWorkflowSection />
      <SecurityStack />
      <TrustList />
      <SecurityThreatModel />
      <AutomationIntegration />
      <AutomationAuth />
      <RoadmapList compact />
      <HomeFaqSection />
      <FinalCTA />
    </>
  );
}
