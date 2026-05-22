import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/i18n/routing';
import type { ChangelogEntry } from '@/lib/changelog';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';

const channelClasses = {
  stable: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-200',
  rc: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  beta: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-200',
};

export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  const t = useTranslations('changelog');
  const locale = useLocale() as Locale;

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
      <ol className="mt-12 divide-y divide-border border-y border-border">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/changelog/${entry.slug}`}
              className="block py-7 transition-colors hover:bg-surface"
            >
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl font-semibold tracking-tight">v{entry.version}</h3>
                <Badge className={cn(channelClasses[entry.channel])}>
                  {entry.channel.toUpperCase()}
                </Badge>
                <time className="font-mono text-xs text-foreground-subtle">{entry.date}</time>
              </div>
              <p className="mt-2 text-base font-medium">{entry.title[locale]}</p>
              <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
                {entry.summary[locale]}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
