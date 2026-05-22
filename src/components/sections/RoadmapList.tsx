import { useLocale, useTranslations } from 'next-intl';
import { roadmap, type RoadmapPhase } from '@/content/roadmap';
import type { Locale } from '@/i18n/routing';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

const variantClasses: Record<RoadmapPhase['statusVariant'], string> = {
  shipped: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  active: 'bg-teal-500 text-white dark:bg-teal-400 dark:text-ink',
  planned: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export function RoadmapList({ compact = false }: { compact?: boolean }) {
  const t = useTranslations('home.roadmap');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {roadmap.map((item) => (
          <li
            key={item.phase}
            className={cn(
              'grid gap-4 py-7 md:grid-cols-[200px_1fr_auto] md:items-center md:gap-8',
            )}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {item.phase}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                {item.title[locale]}
              </h3>
            </div>
            {!compact && (
              <p className="text-sm text-foreground-muted leading-relaxed">
                {item.body[locale]}
              </p>
            )}
            <Badge className={cn('justify-self-start md:justify-self-end', variantClasses[item.statusVariant])}>
              {item.status[locale]}
            </Badge>
          </li>
        ))}
      </ol>
    </section>
  );
}
