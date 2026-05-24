import { SectionScroller } from '@/components/layout/SectionScroller';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { PricingTiers } from '@/components/sections/PricingTiers';

const trackedPricingSections = [{ id: 'compare', path: '/compare' }];

export function PricingContent({ initialSection }: { initialSection?: string }) {
  return (
    <>
      <SectionScroller
        section={initialSection}
        defaultPath="/pricing"
        trackedSections={trackedPricingSections}
      />
      <PricingTiers />
      <ComparisonTable />
    </>
  );
}
