import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren';
import { features } from '@/content/features';
import type { Locale } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { SectionHeading } from './SectionHeading';

export type FeatureGridProps = {
  variant?: 'all' | 'highlight';
};

export function FeatureGrid({ variant = 'all' }: FeatureGridProps) {
  const t = useTranslations('home.features');
  const locale = useLocale() as Locale;
  const items = variant === 'highlight' ? features.filter((f) => f.highlight) : features;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {items.map((feature) => {
          const Icon = feature.icon;
          return (
            <StaggerItem
              key={feature.key}
              className="group relative rounded-lg border border-border bg-surface-elevated p-6 transition-colors hover:border-border-strong"
              role="listitem"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{feature.title[locale]}</h3>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                {feature.body[locale]}
              </p>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </section>
  );
}
